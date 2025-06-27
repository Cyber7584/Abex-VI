echo "Iniciando o deploy em $NODE_ENV"

# Faz o deploy
yarn build \
    && rsync -a build/ ${DEPLOY_USER}@${DEPLOY_HOST}:$DEPLOY_PATH \
    -e "ssh -p ${DEPLOY_PORT}" \
    --recursive