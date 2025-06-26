import os
import joblib # Usado para carregar o modelo e o scaler
import numpy as np # Necessário para manipular os dados de entrada

from flask import Flask, request, jsonify

app = Flask(__name__)

# --- Nomes dos arquivos do seu modelo e scaler ---
# Certifique-se de que esses arquivos (meu_modelo_rf.joblib e scaler.pkl)
# estão no mesmo diretório do seu main.py ou forneça o caminho completo.
MODEL_FILE = 'meu_modelo_rf.joblib' # AGORA é um arquivo .joblib
SCALER_FILE = 'scaler.pkl'

# Variáveis globais para armazenar o modelo e o scaler
model = None
scaler = None

# --- Carregar o modelo e o scaler no início da aplicação ---
try:
    model = joblib.load(MODEL_FILE) # Carrega o modelo com joblib
    scaler = joblib.load(SCALER_FILE) # Carrega o scaler com joblib
    print("Modelo de IA (Random Forest) e Scaler carregados com sucesso!")
except Exception as e:
    print(f"Erro ao carregar modelo ou scaler na API: {e}")
    model = None
    scaler = None

# --- Definições para o seu modelo de doença cardíaca ---
PREDICTION_MESSAGES = {
    0: "Sem Doença Cardíaca Detectada",
    1: "Possibilidade de Doença Cardíaca"
}

# --- Chave Secreta da API (Mantenha esta seção como está) ---
SECRET_KEY = 'sua_chave_secreta_aqui'

# Função para verificar a chave de API (Mantenha esta seção como está)
def check_api_key(req):
    key = req.headers.get('x-api-key')
    return key == SECRET_KEY

# --- Endpoint de Previsão ('/predict') ---
@app.route('/predict', methods=['POST'])
def predict():
    if not check_api_key(request):
        return jsonify({'error': 'Acesso não autorizado, chave inválida'}), 401

    if model is None or scaler is None:
        return jsonify({'error': 'Serviço indisponível: Modelo ou Scaler não carregados.'}), 503

    data = request.get_json()

    expected_num_features = 13 # Seu dataset Cleveland tem 13 features de entrada

    if not data or not isinstance(data, dict):
        return jsonify({'error': 'Dados inválidos. Espera-se um JSON contendo as características.'}), 400

    try:
        # Converter os dados de entrada para um array numpy.
        # A ordem dos valores no JSON PRECISA CORRESPONDER à ordem das colunas no seu X_train original.
        features = np.array(list(data.values())).reshape(1, -1)
    except Exception as e:
        return jsonify({'error': f'Formato das características inválido: {str(e)}. Verifique se enviou 13 valores numéricos.'}), 400

    if features.shape[1] != expected_num_features:
        return jsonify({'error': f'Número de características inválido. Espera-se {expected_num_features}, mas recebeu {features.shape[1]}.'}), 400

    try:
        # --- Pré-processamento e Previsão ---
        features_scaled = scaler.transform(features)

        # Para modelos Scikit-learn, usamos model.predict() para a classe
        # e model.predict_proba() para a probabilidade.
        predicted_class = int(model.predict(features_scaled)[0]) # Retorna 0 ou 1
        prediction_prob = model.predict_proba(features_scaled)[0][1] # Prob. da classe 1

        result_message = PREDICTION_MESSAGES.get(predicted_class, "Resultado Desconhecido")

        return jsonify({
            'prediction_probability_of_disease': float(prediction_prob),
            'predicted_class': predicted_class,
            'prediction_message': result_message
        })
    except Exception as e:
        return jsonify({'error': f'Erro ao fazer a previsão: {str(e)}'}), 500

# Endpoint para verificar a saúde da aplicação (Mantenha esta seção como está)
@app.route('/health', methods=['GET'])
def health():
    if model is not None and scaler is not None:
        return jsonify({'status': 'OK', 'model_loaded': True, 'scaler_loaded': True}), 200
    else:
        return jsonify({'status': 'Degraded', 'model_loaded': False, 'scaler_loaded': False, 'message': 'Modelo ou Scaler não carregados. Verifique logs.'}), 503

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)