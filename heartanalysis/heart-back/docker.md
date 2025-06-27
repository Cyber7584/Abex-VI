# Instalando Docker e rodando uma imagem

O Docker é necessário para rodar o projeto, para instalar no seu Linux use o [link de instalação](https://docs.docker.com/engine/installation/linux/)

# No fedora:

```
$ sudo dnf -y install dnf-plugins-core
$ sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
$ sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose
$
$ sudo systemctl start docker
```

Após fazer a instalação habilite e inicie o docker, com algo parecido com:

```
$ sudo systemctl enable docker
$ sudo systemctl start docker

```

# No ubuntu:

```
$ sudo apt-get remove docker docker-engine docker.io containerd runc
$ sudo apt-get update
$ sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
$
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose

Após fazer a instalação habilite e inicie o docker, com algo parecido com:

```
$ sudo systemctl enable docker
$ sudo systemctl start docker

```

Para Checar a instalação do docker poderá testar:

`$ sudo docker run hello-world`

Para rodar sem sudo, basta adicionar seu usuário ao grupo docker:

```
sudo groupadd docker && sudo gpasswd -a ${USER} docker && sudo systemctl restart docker

```

Depois é só rodar na pasta raíz o:

`$ docker-compose up &`

Pronto, o projeto está ok e rodando.

Verificando os containers em execução, deste projeto é apibase

`$ sudo docker ps`

Posteriormente acesse o bash do container, é algo como um ssh, porém em um container, basicamente você anexa o bash do container:

`$ docker exec -it apibase /bin/bash`

Depois de anexar ao bash do container basta iniciar o node com nodemon que fica atualizando o projeto sem precisar parar e iniciar novamente o server a cada alteração do fonte, com o comando abaixo, que irá subir o projeto a partir do index.js:

`$ ./node_modules/.bin/nodemon`

Pronto assim poderá acessar o projeto na porta 8080, que está na configuração do arquivo `index.js`

## Caso queira mais dados sobre outros componentes pode continuar a leitura, caso contrário até aqui está ok, pois o projeto já sobe uma imagem Redis, postgres e node.

### Baixe uma imagem do Redis.

Há diversas imagens no [Docker Hub](https://hub.docker.com/), recomendo a utilização da imagem oficial baseada em Alpine.
Pode ser realizada uma busca por Redis e encontrar uma imagem oficial.
Escolhida a imagem baixe-a:

`sudo docker pull redis:6.2.2-alpine`

Visualizando suas imagens locais:

`sudo docker images`

Para Rodar o seu container:

` sudo docker run -d -p 6379:6379 -i -t redis:6.2.2-alpine`

Como pode imaginar `docker run` é para rodar o container, `-d` em background, `-p` publicar a porta para o host, `-i` manterá STDIN aberta sempre e `-t` alocará um pseudo TTY (TeleTYpewriter)

Neste caso, estamos setando a porta 6379 mapeada na porta 6379 do container, rodando a imagem `redis:6.2.2-alpine`

Verificando os containers em execução

`sudo docker ps`

Agora temos uma imagem do Redis rodando no docker, para testar:

Instale o pacote redis, no fedora é assim:

`sudo dnf install redis`

Teste o cliente:

```
$ redis-cli

127.0.0.1:6379>
```

Caso queira testar no modo mais raiz:

```
$ telnet 127.0.0.1 6379

Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is '^]'
```

Testando comunicação node com o Redis:

Instale o Redis client `npm install redis`

```
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

```

Rode o arquivo `node redis.js`

Para encerrar o container

```
sudo docker stop [container id]
```

O ID pode ser visto no `sudo docker ps` e será algo como `5d468031bdde`

That is all folks
