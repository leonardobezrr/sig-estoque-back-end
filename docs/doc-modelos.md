# Documento de Modelos

Neste documento temos o modelo Conceitual (UML) ou de Dados (Entidade-Relacionamento). Temos também a descrição das entidades e o dicionário de dados.

## Modelo Conceitual

### Diagrama de Classes usando Mermaid

```mermaid
classDiagram    

    Usuário <|-- Gerente
    Usuário <|-- Funcionário
    ItemCompra "1. *" -- "1" Compra
    Compra "0. *" -- "1" Usuário
    Venda "0. *" -- "1" Usuário
    Fornecedor "1" -- "1. *" ItemCompra
    Item  "1. *" -- "0. *" Venda
    Produto "1" -- "0. *" Compra
    Item "0. *" -- "1" Produto
    Item "" <|-- "" ItemCompra 

 
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
    class ItemCompra {
        -int id
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
        -string lote

        +setDescricao(string descricao) void 
        +setNome(string nome) void
        +setPreco(double preco) void
        +setQtd_estoque(int qtd_estoque) void
        +setLote(string lote) void

        +getDescricap() string 
        +getNome() string 
        +getPreco() double
        +getQtd_estoque() int
        +getLote() string 

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
### Descrição das Entidades

Descrição sucinta das entidades presentes no sistema.

| Entidade | Descrição   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usuário   | Entidade que representa um usuário tem como atributos: id, nome, senha e email e seus métodos são: setNome(nome) , setSenha(senha), setEmail(email), getNome(), getSenha(), getEmail(), IncluirUsuário(user Usuário), ExcluirUsuário(user Usuário), EditarUsuário(user Usuário), ConsultarUsuário(user Usuário). |
| Funcionário | Entidade que representa um funcionário herdando a entidade usuário. |
| Gerente | Entidade que representa um gerente herdando a entidade usuário. |
| Compra | Entidade que representa uma compra com os seguintes atributos: id, num_nf, quantidade, valor, e seus métodos são: setNum_nf(num_nf), setQuantidade(quantidade), setValor(valor), getNum_nf(), getQuantidade(), getValor(), IncluirCompra(compra Compra), ExcluirCompra(compra Compra), EditarCompra(compra Compra), ConsultarCompra(compra Compra). |
| Fornecedor | Entidade que representa um fornecedor com os seguintes atributos: id, nome_social, nome_empresa, telefone, CNPJ, e seus métodos são: setNome_social(nome_social), setNome_empresa(nome_empresa), setTelefone(telefone), setCNPJ(CNPJ), getNome_social(), getNome_empresa(), getTelefone(), getCNPJ(), IncluirFornecedor(fornecedor Fornecedor), ExcluirFornecedor(fornecedor Fornecedor), EditarFornecedor(fornecedor Fornecedor), ConsultarFornecedor(fornecedor Fornecedor). |
| Produto | Entidade que representa um produto com os seguintes atributos: id, descricao, nome, preco, qtd_estoque, e seus métodos são: setDescricao(descricao), setNome(nome), setPreco(preco), setQtd_estoque(qtd_estoque), getDescricao(), getNome(), getPreco(), getQtd_estoque(), IncluirProduto(produto Produto), ExcluirProduto(produto Produto), EditarProduto(produto Produto), ConsultarProduto(produto Produto). |
| Item | Entidade que representa um item com os seguintes atributos: id, quantidade, preco, e seus métodos são: setQuantidade(quantidade), setPreco(preco), getQuantidade(), getPreco(), IncluirItem(item Item), ExcluirItem(item Item), EditarItem(item Item), ConsultarItem(item Item). |
| Venda | Entidade que representa uma venda com os seguintes atributos: id, data_venda, num_nf, e seus métodos são: setData_venda(data_venda), setNum_nf(num_nf), getData_venda(), getNum_nf(), IncluirVenda(venda Venda), ExcluirVenda(venda Venda), EditarVenda(venda Venda), ConsultarVenda(venda Venda). |