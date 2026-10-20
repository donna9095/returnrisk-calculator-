import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score

def train():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, "..", "flipkart_cleaned.csv")
    
    print(f"Loading catalog dataset from: {csv_path}")
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Cannot find {csv_path}")
        
    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} rows.")

    # 1. Feature Engineering: Realistic pre-dispatch signals
    # Base category risk priors (apparel & footwear have higher return rates)
    category_risk_map = {
        'Clothing': 0.28,
        'Footwear': 0.24,
        'Jewellery': 0.12,
        'Watches': 0.09,
        'Bags, Wallets & Belts': 0.08
    }
    
    np.random.seed(42)
    n = len(df)
    
    # Map category risk, default to 0.15
    df['cat_risk'] = df['category'].map(category_risk_map).fillna(0.15)
    
    # Feature 1: Discount Depth (high discounts increase impulse buying & return risk)
    df['discount_ratio'] = df['discount_percent'] / 100.0
    
    # Feature 2: Price tier (scaled)
    df['log_price'] = np.log1p(df['price'].clip(lower=100))
    
    # Feature 3: Sizing volatility (simulate size fit sensitivity for clothing/footwear)
    df['is_size_sensitive'] = df['category'].apply(lambda c: 1 if c in ['Clothing', 'Footwear'] else 0)
    
    # Feature 4: Simulated Customer Prior Return Rate (mean 0.14, std 0.10)
    customer_return_prior = np.clip(np.random.beta(2, 10, size=n), 0.0, 0.70)
    df['customer_return_prior'] = customer_return_prior
    
    # Feature 5: Simulated Payment Method (1 = COD, 0 = Prepaid; COD has ~2.2x higher return/RTO risk)
    is_cod = np.random.choice([1, 0], size=n, p=[0.45, 0.55])
    df['is_cod'] = is_cod
    
    # 2. Realistic ground truth target synthesis: Logit model based on proven e-commerce dynamics
    # log-odds of return
    logits = (
        -2.4 +
        2.2 * df['cat_risk'] +
        1.5 * df['discount_ratio'] +
        0.3 * (df['log_price'] - df['log_price'].mean()) +
        0.8 * df['is_size_sensitive'] +
        3.5 * df['customer_return_prior'] +
        0.9 * df['is_cod'] +
        np.random.normal(0, 0.35, size=n)
    )
    
    # Probability
    prob_return = 1.0 / (1.0 + np.exp(-logits))
    # Threshold to yield ~18% realistic return rate
    y = (prob_return > 0.40).astype(int)
    
    print(f"Class distribution: Total={n}, Returns={y.sum()} ({y.mean()*100:.2f}%), Kept={(y==0).sum()}")
    
    feature_cols = ['cat_risk', 'discount_ratio', 'log_price', 'is_size_sensitive', 'customer_return_prior', 'is_cod']
    X = df[feature_cols].copy()
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Compute class weight for imbalance
    pos_weight = float((len(y_train) - y_train.sum()) / y_train.sum())
    print(f"Handling class imbalance: scale_pos_weight = {pos_weight:.2f}")
    
    # Model 1: Logistic Regression
    lr = LogisticRegression(class_weight='balanced', max_iter=1000)
    lr.fit(X_train_scaled, y_train)
    y_pred_lr = lr.predict(X_test_scaled)
    y_prob_lr = lr.predict_proba(X_test_scaled)[:, 1]
    
    # Model 2: Random Forest
    rf = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42, max_depth=8)
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)
    y_prob_rf = rf.predict_proba(X_test)[:, 1]
    
    # Model 3: XGBoost (Champion Model)
    xgb = XGBClassifier(
        n_estimators=150,
        max_depth=5,
        learning_rate=0.08,
        scale_pos_weight=pos_weight,
        eval_metric='logloss',
        random_state=42
    )
    xgb.fit(X_train, y_train)
    y_pred_xgb = xgb.predict(X_test)
    y_prob_xgb = xgb.predict_proba(X_test)[:, 1]
    
    # Benchmark Comparison
    comparison = {
        'Logistic Regression': {
            'Precision': round(float(precision_score(y_test, y_pred_lr)), 3),
            'Recall': round(float(recall_score(y_test, y_pred_lr)), 3),
            'F1': round(float(f1_score(y_test, y_pred_lr)), 3),
            'ROC-AUC': round(float(roc_auc_score(y_test, y_prob_lr)), 3)
        },
        'Random Forest': {
            'Precision': round(float(precision_score(y_test, y_pred_rf)), 3),
            'Recall': round(float(recall_score(y_test, y_pred_rf)), 3),
            'F1': round(float(f1_score(y_test, y_pred_rf)), 3),
            'ROC-AUC': round(float(roc_auc_score(y_test, y_prob_rf)), 3)
        },
        'XGBoost (Champion)': {
            'Precision': round(float(precision_score(y_test, y_pred_xgb)), 3),
            'Recall': round(float(recall_score(y_test, y_pred_xgb)), 3),
            'F1': round(float(f1_score(y_test, y_pred_xgb)), 3),
            'ROC-AUC': round(float(roc_auc_score(y_test, y_prob_xgb)), 3)
        }
    }
    
    print("\n--- MODEL COMPARISON RESULTS ---")
    for model_name, metrics in comparison.items():
        print(f"{model_name}: Precision={metrics['Precision']}, Recall={metrics['Recall']}, F1={metrics['F1']}, ROC-AUC={metrics['ROC-AUC']}")
        
    # Feature importances from XGBoost
    importances = dict(zip(feature_cols, [round(float(v), 4) for v in xgb.feature_importances_]))
    print(f"\nFeature Importances: {importances}")
    
    # Save artifacts
    artifacts = {
        'model': xgb,
        'scaler': scaler,
        'feature_cols': feature_cols,
        'category_risk_map': category_risk_map,
        'log_price_mean': float(df['log_price'].mean()),
        'feature_importances': importances
    }
    
    model_file = os.path.join(current_dir, "model.joblib")
    metrics_file = os.path.join(current_dir, "metrics.json")
    
    joblib.dump(artifacts, model_file)
    with open(metrics_file, "w") as f:
        json.dump(comparison, f, indent=2)
        
    print(f"\nSaved trained model to {model_file}")
    print(f"Saved benchmark metrics to {metrics_file}")

if __name__ == "__main__":
    train()
