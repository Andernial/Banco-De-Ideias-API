# Banco de Ideias API💡

## 👾Tecnologias utilizadas
node, express, cors, nodemon, sequelize, dot env lib, jsonwebtoken lib, mysql2. 

## 📜Visão Geral
Esta API foi desenvolvida para o site Banco de Ideias, onde são tratados o sistema de cadastro, sistema de login, CRUD de posts e privilégios de administração de posts e usuários para administradores.

A criação de login e cadastro utiliza a biblioteca jsonWebToken para validação e autenticação de tokens.

As entidades contam com verificações e a API contém sistema de paginação nas rotas GET que lidarão com muitos dados.

Aqui você pode acessar o link do repositório do frontend: https://github.com/worklarissa/Banco-De-Ideias-API-Front

O deploy da API foi feito utilizando o Railway. Você pode acessar as rotas através deste link: https://banco-de-ideiasapi.up.railway.app + rota

## ⏫​Atualização mais Recente 

Versão 0.0.1 -> Atualização de Lançamento

## 💻​Configuração do Ambiente

Crie um arquivo **.env** na pasta raiz do seu projeto e configure as variavies de ambiente necessarias:

Exemplo MySql:
```

DB_USERNAME='nome de usuario'
DB_PASSWORD='senha'
DATABASE='nome do banco'
DB_HOST= 'tipo de host do banco exemplo:'localhost''
DB_PORT='porta do mysql'
PORT='porta do servidor'
DB_DIALECT=mysql
JWT_SECRET = secret da api
```

## 📫Endpoints
### User

**create** `metodo post`

```
API:(porta se o acesso for local)/user/create

body: {"email":"email","password":"password","name":"name" }
```

**login** `metodo post`

```
API:(porta se o acesso for local)/user/login

body: {"email":"email","password":"password"}
```

**logout** `metodo post`:

exemplo de requisição:
```
API:(porta se o acesso for local)/user/logout

headers:x-acess-token
```

**update** `metodo patch`

```
API:(porta se o acesso for local)/User/update-user

body(somente 1 dos parâmentros é necessário): {"email":"email","password":"password"}
headers:x-acess-token
```

**delete** `metodo delete`

```
API:(porta se o acesso for local)/user/delete

headers:x-acess-token
```

### Projects

**create** `metodo post`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/create
body: {"title":"title","text":"text","difficultLevel":1,"postColor":"FFD602(deve ser uma das cores validas)","hashtags":["#exemploTecnologia","#ExemploTecnologia"]

}
headers:x-acess-token
```

**update** `metodo patch`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/update-my/(id do projeto)
body: {"title":"title","text":"text","postColor":"corValida"}
headers:x-acess-token
```

**mostra projetos validos** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/show-valid?limit=6&offset=0 (o limit e o offset contem default value então não são obrigatórios na requisição)
```

**mostra meus projetos válidos** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/show-my?limit=5&offset=0 (o limit e o offset contem default value então não são obrigatórios na requisição)
headers:x-acess-token
```

**meus projetos em espera** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/show-standby?limit=5&offset=0 (o limit e o offset contem default value então não são obrigatórios na requisição)
headers:x-acess-token
```

**deleta meu projeto** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/project/delete-my/(id do projeto)
headers:x-acess-token
```

### Adm

**cadastra primeiro adm** `metodo post` (esta rota é só para o caso do acesso do projeto localmente):

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/create-first
body: {"name":"name","password":"password"}
```

**cadastra** `metodo post`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/create  
body: {"name":"name","password":"password"}
headers:x-acess-token
```

**login** `metodo post`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/login
body: {"name":"name","password":"password"}
```

**mostra todos os usuários** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/all-users
headers:x-acess-token
```

**logout** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/logout
headers:x-acess-token
```

**update adm** `metodo patch`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/update/(id do adm)
body(somente 1 dos parâmentros é necessário): {"name":"name","password":"password"}
headers:x-acess-token
```

**deleta project** `metodo delete`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/delete-project/(id do projeto)
headers:x-acess-token
```

**delete adm** `metodo delete`:

exemplo de requisição:
```
API:(porta se o acesso for local)Adm/delete-adm/:admid
headers:x-acess-token
```

**deleta user** `metodo delete`:

exemplo de requisição:
```
API:(porta se o acesso for local)adm/delete-user/(id do usuário)
headers:x-acess-token
```

**mostra todos os projetos** `metodo get`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/all-projects
headers:x-acess-token
```

**deleta adm** `metodo delete`:

exemplo de requisição:
```
API:(porta se o acesso for local)/adm/delete/(id do adm)
headers:x-acess-token
```

## 📦​Considerações Finais 
Futuramente novas rotas podem ser adicionadas e lógicas serem alteradas conforme for necessário para acompanhar as necessidades do front-end.


