# Recuperar Senha

**Requisitos Funcionais**
-o usuário deve poder recuperar sua senha informando seu e-mail
-o usuário deve receber um e-mail com instruções de recuperaçao de senha
-o usuário deve poder resetar sua senha

**Requisitos não Funcionais**
-utilizar Mailtrap para testar envios em ambiente de dev
-utilizar Amazon SES para envios em produção

- o envio de e-mail deve ancontecer em uma fila de produção

**Regras de negicios**
-O link enviado por email para resetar senha, deve expirar em menso de um dia
-o usuário precisa confirmar a nova senha ao resetar sua senha

# Atualizaçao de perfil

**Requisitos Funcionais**

-o usuário deve poder atualizar seu nome, email e senha

**Regras de negicios**

-o usuário não pode alterar seu email para um email já existente
-Para atualizar sua senha, o usuário deve informar a senha antiga
-para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do Prestador

**Requisitos Funcionais**

-o usuário deve poder listar seus agendamentos de um dia específico
-o prestador deve receber uma notificação sempre que houver um novo agendamento
-o prestado deve poder visualizar as notificações Não lidas

**Requisitos não Funcionais**

-os agendaentos do prestador no dia devem ser armazenados em cache
-as notificações do prestador devem ser armazenadas no MongoDR
-as notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**Regras de negicios**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**Requisitos Funcionais**

-o usuário deve poder listar todos os prestadores de serviçoes cadastrados
-o usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
-o usuário deve poder listar horários disponíveis em um dia específico de um prestador
-o usuário deve poder realizar um novo agendamento com um prestador

**Requisitos não Funcionais**

-A listagem de prestadores deve ser armazenada em cache

**Regras de negicios**

-cada agendamento deve durar 1hr exatamente
-Os agendamenos devem estar disponíveis entre 8hr ás 18hr (primeiro agendamento as 8hr, e ultimo agendamento as 17hr)

- o usuário não pode agendar em um horário já ocupado
- o usuário não pode agendar em um horário que já passou
- o usuário não pode agendar serviços consigo mesmo
