import subprocess
import json
import os

deploy_data = json.loads(os.environ["DEPLOY_DATA"])
node_env = os.environ["NODE_ENV"]

print(f"Iniciando o deploy em {node_env}")

# run the build command and check if it was successful
build = subprocess.run(["npm", "run", "build"])

if build.returncode != 0:
    print("Erro ao executar o build")
    exit(1)

for data in deploy_data:
    name = data["name"]
    deploy_user = data["deploy_user"]
    deploy_host = data["deploy_host"]
    deploy_path = data["deploy_path"]
    deploy_port = data["deploy_port"]
    active = data["active"]

    if(not active):
        continue

    # Sync the project files with the remote host
    rsync_process = subprocess.run([
        "rsync", "-a", "./", f"{deploy_user}@{deploy_host}:{deploy_path}",
        "-e", f"ssh -p {deploy_port}",
        "--include", "docker-compose.yml",
        "--include", "Dockerfile",
        "--include", "package.json",
        "--include", "package-lock.json",
        "--include", "ecosystem.config.js",
        "--include", "/dist/",
        "--include", "/dist/**",
        "--exclude", "*",
        "--recursive"
    ])

    if(rsync_process.returncode != 0):
        print("Erro ao sincronizar os arquivos em {}".format(name))
        print(rsync_process.stdout)
        exit(1)

# Um por um, faz o npm install
for data in deploy_data:
    name = data["name"]
    deploy_user = data["deploy_user"]
    deploy_host = data["deploy_host"]
    deploy_path = data["deploy_path"]
    deploy_port = data["deploy_port"]
    docker = data["docker"]
    active = data["active"]

    if(not active):
        continue
    
    if(docker):
        process_npm = subprocess.run([
            "ssh", f"{deploy_user}@{deploy_host}", "-p", f"{deploy_port}",
            "cd", f"{deploy_path}", "&&",
            "docker-compose", "exec", "--user=root", "-T", "api", "npm", "install"
        ])
    else:
        process_npm = subprocess.run([
            "ssh", f"{deploy_user}@{deploy_host}", "-p", f"{deploy_port}",
            "cd", f"{deploy_path}", "&&",
            "npm", "install"
        ])

    if(process_npm.returncode != 0):
        print("Erro ao instalar as dependências em {}".format(name))
        print(process_npm.stdout)
        exit(1)

# Um por um, reseta o pm2
for data in deploy_data:
    name = data["name"]
    deploy_user = data["deploy_user"]
    deploy_host = data["deploy_host"]
    deploy_path = data["deploy_path"]
    deploy_port = data["deploy_port"]
    docker = data["docker"]
    active = data["active"]

    if(not active):
        continue
    
    if(docker):
        subprocess.run([
            "ssh", f"{deploy_user}@{deploy_host}", "-p", f"{deploy_port}",
            "cd", f"{deploy_path}", "&&",
            "docker-compose", "exec", "-T", "api", "pm2", "reload", "all"
        ])
    else:
        subprocess.run([
            "ssh", f"{deploy_user}@{deploy_host}", "-p", f"{deploy_port}",
            "cd", f"{deploy_path}", "&&",
            "pm2", "reload", "all"
        ])
