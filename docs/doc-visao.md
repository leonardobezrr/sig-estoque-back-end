# Documento de Visão

Documento construído a partido do **Modelo BSI - Doc 001 - Documento de Visão** que pode ser encontrado no
link: https://docs.google.com/document/d/1LD2UdvKGtWbAQlUB5AsO4twpdm0RM9nq7wqs_CvkjOc/edit

## Equipe e Definição de Papéis

Membro     |     Papel   |   E-mail   |
---------  | ----------- | ---------- |
Breno    | Desenvolvedor  | breno.porfirio.079@ufrn.edu.br
Leonardo     | Cliente | Leonardobezerra05@gmail.com
Ricardo         | Gerente  | ricardo.alencar.122@ufrn.edu.br
Luís      | Desenvolvedor | Luisf311220@gmail.com
Gabriel      | Desenvolvedor | gabriel.lima.112@ufrn.edu.br
Charles      | Desenvolvedor | charleseduardofaria@gmail.com

### Matriz de Competências

Membro     |     Competências   |
---------  | ----------- |
Breno    | HTML, CSS, Javascript, React, Next, Typescript, Node, Prisma e Figma. |
Leonardo     | HTML, CSS, JavaScript, React, Next, Golang, PostgreSQL, Python. |
Ricardo        | HTML, CSS, JavaScript, React, Golang, Node, MySQL, PostgreSQL, PHP, WordPress. |
Luís       | HTML, CSS, Javascript , C, C++, QT creator, QT designer. |
Gabriel       | HTML, CSS, JavaScript, React, Next, Vue.js, UI/UX design, Figma, MariaDB, python, C, Angular, TypeScript. |
Charles      | Java, Spring Boot, Laravel, Node, HTML, CSS, JQuery, Postgres, MySQL, Figma, Modelagem de Dados |


## Perfis dos Usuários

O sistema poderá ser utilizado por diversos usuários. Temos os seguintes perfis/atores:

Perfil                                 | Descrição   |
---------                              | ----------- |
Gerente | Este usuário utiliza o sistema para gerenciar usuários. Fazer cadastro, exclusão, edição e visualização de usuários. Compra de produtos.
Funcionário | Este usuário utiliza o sistema para gerenciar produtos. Fazer cadastro, exclusão, edição, visualização dos produtos no sistema e pesquisa. Receber produtos e dar baixa no sistema nas entradas e saídas. Cadastrar fornecedores.

## Lista de Requisitos Funcionais

### Gerenciar usuários

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF001 - Cadastrar usuários     |  Funcionalidade exclusiva do administrador do sistema onde o mesmo irá realizar o cadastro de usuários | Administrador |
RF002 - Excluir usuários     |  Funcionalidade exclusiva do administrador do sistema onde o mesmo irá realizar a exclusão dos usuários | Administrador |
RF003 - Editar usuários     |  Funcionalidade exclusiva do administrador do sistema onde o mesmo irá realizar a edição dos usuários | Administrador |
RF004 - Visualizar usuários     |  Funcionalidade exclusiva do administrador do sistema onde o mesmo poderá visualizar os usuários | Administrador |

### Gerenciar produtos

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF005 - Cadastrar produtos | Funcionalidade destinada ao funcionário do sistema possibilitando o cadastro de produtos no sistema e quantidade de estoque | Funcianário |
RF006 - Excluir produtos | Funcionalidade destinada ao funcionário do sistema possibilitando a exclusão de produtos do sistema. | Funcianário |
RF007 - Editar produtos | Funcionalidade destinada ao funcionário do sistema possibilitando a editação de produtos do sistema. | Funcianário |
RF008 - Visualizar produtos | Funcionalidade destinada ao funcionário do sistema possibilitando a visualização de produtos do sistema | Funcianário |

### Gerenciar fornecedores

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF009 - Cadastrar fornecedores | Possibilidade de cadastrar fornecedores, guardando seus dados para futuras compras. | Administrador |
RF010 - Excluir fornecedores | Possibilidade de excluir fornecedores do sistema. | Administrador |
RF011 - Editar fornecedores | Possibilidade de editar fornecedores do sistema. | Administrador |
RF012 - Visualizar fornecedores | Possibilidade de visualizar fornecedores do sistema. | Administrador |

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF013 - Login | Funcionalidade realizada por outros usuários, para obter acesso ao sistema, recuperar senha e alterar informações dos usuários. | Administrador |
RF014 - Registrar Nota Fiscal Eletrônica |  Registrar a Nota Fiscal recebida pelo fornecedor no momento em que for realizada uma compra, contabilizando o item no estoque e, no momento em que houver a saída de algum item, debitando o item no estoque | Administrador |
RF015 - Gerar Log | O requisito funcional de número 14 é incluído, porém, são adicionados a ele os dados do gerenciamento de produtos e do registro de entradas, a fim de criar um arquivo mais amplo que o RF014, permitindo, assim, visualizar as informações a partir de um escopo geral, diferente do requisito citado anteriormente, que é focado apenas nas entradas.
RF016 - Registrar compra |  O funcionário irá informar o gerente da falta de algum material/produto, o qual irá realizar a compra do mesmo para reabastecimento do estoque, em seguida, caberá ao funcionário dar baixa dos itens no sistema. | Funcionário |

### Gerenciar vendas

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF017 - Cadastrar vendas | Possibilidade de cadastrar vendas, guardando seus dados para visualizar futuramente. | Funcionário |
RF018 - Excluir vendas | Possibilidade de excluir vendas do sistema. | Funcionário |
RF019 - Editar vendas | Possibilidade de editar vendas do sistema. | Funcionário |
RF020 - Visualizar vendas | Possibilidade de visualizar vendas do sistema. | Funcionário |
RF021 - Debitar estoque | O sistema deve debitar os produtos relacionados a uma venda. | Funcionário |

### Gerenciar compras

Requisito                                 | Descrição   | Ator |
---------                                 | ----------- | ---------- |
RF022 - Cadastrar compras | Possibilidade de cadastrar compras vinculadas a um fornecedor. | Funcionário |
RF023 - Excluir compras | Possibilidade de excluir compras do sistema. | Funcionário |
RF024 - Editar compras | Possibilidade de editar compras do sistema. | Funcionário |
RF025 - Visualizar compras | Possibilidade de visualizar compras do sistema. | Funcionário |
RF026 - Creditar estoque | O sistema deve creditar os produtos relacionados a uma compra. | Funcionário |


### Modelo Conceitual

Abaixo apresentamos o modelo conceitual usando o **YUML**.

 ```mermaid
classDiagram    
    Usuário <|-- Gerente
    Usuário <|-- Funcionário
    Compra "0. *" -- "1" Usuário
    Venda "0. *" -- "1" Usuário
    Fornecedor "1" -- "0. *" Compra
    Item  "1. *" -- "0. *" Venda
    Produto "1" -- "0. *" Compra
    Item "0. *" -- "1" Produto

    class Usuário {
        
        -int id
        -string nome
        -string senha
        -string email

        +setNome(string nome) void 
        +setSenha(string senha) void
        +setEmail(string email) void

        +getNome() string 
        +getSenha() string
        +getEmail() string

        +IncluirUsuário(user Usuário) void
        +ExcluirUsuário(user Usuário) void
        +EditarUsuário(user Usuário) void
        +ConsultarUsuário(user Usuário) void
    }
    class Gerente {
        -int id
    }
    class Funcionário {
        -int id
    }
    class Compra {
        -int id
        -int num_nf
        -int quantidade
        -double valor
        
        +setNum_nf(int num_nf) void 
        +setQuantidade(int quantidade) void
        +setValor(double valor) void

        +getNum_nf() int 
        +getQuantidade() int
        +getValor() int

        +IncluirCompra(compra Compra) void
        +ExcluirCompra(compra Compra) void
        +EditarCompra(compra Compra) void
        +ConsultarCompra(compra Compra) void
    }
    class Fornecedor {
        -int id
        -string nome_social
        -string nome_empresa
        -string telefone
        -string CNPJ

        +setNome_social(string nome_social) void 
        +setNome_empresa(string nome_empresa) void
        +setTelefone(string Telefone) void
        +setCNPJ(string CNPJ) void

        +getNome_social() string 
        +getNome_empresa() string 
        +getTelefone() string
        +getCNPJ() string

        +IncluirFornecedor(fornecedor Fornecedor) void
        +ExcluirFornecedor(fornecedor Fornecedor) void
        +EditarFornecedor(fornecedor Fornecedor) void
        +ConsultarFornecedor(fornecedor Fornecedor) void
    }
    class Produto {
        -int id
        -string descricao
        -string nome
        -double preco
        -int qtd_estoque

        +setDescricao(string descricao) void 
        +setNome(string nome) void
        +setPreco(double preco) void
        +setQtd_estoque(int qtd_estoque) void

        +getDescricap() string 
        +getNome() string 
        +getPreco() double
        +getQtd_estoque() int

        +IncluirProduto(produto Produto) void
        +ExcluirProduto(produto Produto) void
        +EditarProduto(produto Produto) void
        +ConsultarProduto(produto Produto) void
    }
    class Item {
        -int id
        -int quantidade
        -double preco
         
        +setQuantidade(int Quantidade) void
        +setPreco(double preco) void

        +getQuantidade() string 
        +getPreco() double

        +IncluirItem(item Item) void
        +ExcluirItem(item Item) void
        +EditarItem(item Item) void
        +ConsultarItem(item Item) void
    }
    class Venda {
        -int id
        -int data_venda
        -int num_nf
        
        +setData_venda(int data_venda) void
        +setNum_nf(int num_nf) void

        +getData_venda() int 
        +getNum_nf() int

        +IncluirVenda(venda Venda) void
        +ExcluirVenda(venda Venda) void
        +EditarVenda(venda Venda) void
        +ConsultarVenda(venda Venda) void
    }

```

#### Descrição das Entidades

## Lista de Requisitos Não-Funcionais

Requisito                                 | Descrição   |
---------                                 | ----------- |
RNF001 - Disponibilidade | Utilização do módulo de informações cadastrais em modo offline. |
RNF002 - Segurança |  Encripta os dados e informações para que apenas aqueles logados no sistema possam visualizá-los |
DEP001 - Sistema de vendas | Existe a necessidade de que haja um sistema de vendas, para que suas notas sirvam de entrada para o sistema de estoque. |
DEP002 - Sistema de apoio a decisão |  Existe a necessidade de que haja um sistema de apoio a decisão, para que possa converter os dados do Gerar Log em um dashboard |

## Riscos

Tabela com o mapeamento dos riscos do projeto, as possíveis soluções e os responsáveis.

Data | Risco | Prioridade | Responsável | Status | Providência/Solução |
------ | ------ | ------ | ------ | ------ | ------ |
19/03/2024 | Não aprendizado das ferramentas utilizadas pelos componentes do grupo | Alta | Gerente | Vigente | Reforçar estudos sobre as ferramentas e aulas com a integrante que conhece a ferramenta |
19/03/2024 |Máquinas incapazes de fornecer os recursos necessários para o funcionamento do sistema | Média | Todos | Vigente | Recomendar a compra de novos dispositivos capazes de fornecer os recursos necessários para o funcionamento pleno do sistema. |
19/03/2024 | Divisão de tarefas mal sucedida | Baixa | Gerente | Vigente | Acompanhar de perto o desenvolvimento de cada membro da equipe |
19/03/2024 | Implementação de protótipo com as tecnologias | Alto | Todos | Resolvido | Encontrar tutorial com a maioria da tecnologia e implementar um caso base do sistema |
19/03/2024 | Atrasos no cronograma | Média | Todos | Vigente | Este risco pode ser causado por uma série de fatores, como a falta de recursos, a falta de planejamento ou a falta de comunicação entre os membros da equipe. Para mitigar este risco, é importante ter um cronograma realista e flexível, e garantir que todos os membros da equipe estejam alinhados com os objetivos do projeto.|
19/03/2024 | Risco de qualidade do produto | Alto | Todos | Vigente | Este risco pode ser causado por uma série de fatores, como a falta de atenção aos detalhes ou a falta de testes adequados. Para mitigar este risco, é importante ter uma equipe experiente, garantir que os membros da equipe estejam focados na qualidade do produto e realizar testes rigorosos. |
19/03/2024 | Insatisfação do cliente | Alto | Todos | Vigente | Este risco pode ser causado por uma série de fatores, como a falta de comunicação com o cliente, a entrega de um produto que não atende às expectativas do cliente ou a falta de suporte pós-venda. Para mitigar este risco, é importante manter uma comunicação aberta com o cliente, garantir que o produto atenda às expectativas do cliente e oferecer um bom suporte pós-venda. |

### Referências
