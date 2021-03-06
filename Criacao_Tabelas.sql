-- ************************************** [dbo].[Arquivo]
USE CFBDB
GO

CREATE TABLE [dbo].[Arquivo]
(
 [cd_arquivo]   bigint NOT NULL ,
 [cd_tipo_arquivo] int NOT NULL ,
 [dt_referencia_arquivo] CHAR(6) NOT NULL ,

 CONSTRAINT [PK_Arquivo] PRIMARY KEY CLUSTERED ([cd_arquivo] ASC)
);
GO

CREATE TABLE [dbo].[Tipo_Arquivo]
(
 [cd_tipo_arquivo]   int NOT NULL ,
 [descricao_tipo_arquivo] nvarchar(30) NOT NULL ,

 CONSTRAINT [PK_Tipo_Arquivo] PRIMARY KEY CLUSTERED ([cd_tipo_arquivo] ASC)
);
GO

ALTER TABLE [dbo].[Arquivo]
ADD CONSTRAINT FK_Arquivo_Tipo_Arquivo KEY (cd_tipo_arquivo) REFERENCES Tipo_Arquivo(cd_tipo_arquivo);
GO

-- ************************************** [dbo].[Ajuste]
CREATE TABLE [dbo].[Ajuste]
(
 [cd_ajuste]  int NOT NULL ,
 [dt_referencia_arquivo]     CHAR(6) NOT NULL ,
 [dt_ajuste]  datetime NOT NULL ,
 [nsu]        bigint NOT NULL ,
 [sequencia]  int NOT NULL ,
 [ec]         bigint NOT NULL ,
 [valor]      money NOT NULL ,
 [cd_arquivo] bigint NOT NULL ,


 CONSTRAINT [PK_Ajuste] PRIMARY KEY CLUSTERED ([cd_ajuste] ASC),
 CONSTRAINT [FK_Ajuste_Arquivo] FOREIGN KEY ([cd_arquivo])  REFERENCES [dbo].[Arquivo]([cd_arquivo])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_63] ON [dbo].[Ajuste]
 (
  [cd_arquivo] ASC
 )
GO

-- ************************************** [dbo].[Bandeira]
CREATE TABLE [dbo].[Bandeira]
(
 [cd_bandeira] int NOT NULL ,
 [descricao_bandeira] varchar(30) NOT NULL,

 CONSTRAINT [PK_Bandeira] PRIMARY KEY CLUSTERED ([cd_bandeira] ASC)
);
GO

-- ************************************** [dbo].[Transacao]
CREATE TABLE [dbo].[Transacao]
(
 [cd_transacao]     int NOT NULL ,
 [cd_terminal]      int NULL ,
 [dt_hr_transacao]  datetime NOT NULL ,
 [dt_prevista]      datetime NULL ,
 [nsu]              bigint NOT NULL ,
 [dt_efetiva]       datetime NULL ,
 [pl]               int NOT NULL ,
 [ncar]             int NOT NULL ,
 [vl_liquido]       money NULL ,
 [vl_liquido_4dec]  money NULL ,
 [tx_admin]         decimal(18,5) NOT NULL ,
 [antec]            varchar(5) NULL ,
 [operacao]         int NULL,
 [ec_origem]        int NULL ,
 [autori]           int NOT NULL ,
 [vl_total_venda]   money NOT NULL ,
 [vl_bruto_parcial] money NOT NULL ,
 [tipo]             int NULL ,
 [ec]               bigint NOT NULL ,
 [cd_arquivo]       bigint NOT NULL ,
 [cd_bandeira]      int NOT NULL ,
 [cd_modalidade]    int NOT NULL ,


 CONSTRAINT [PK_Transacao] PRIMARY KEY CLUSTERED ([cd_transacao] ASC),
 CONSTRAINT [FK_Transacao_Arquivo] FOREIGN KEY ([cd_arquivo])  REFERENCES [dbo].[Arquivo]([cd_arquivo]),
 CONSTRAINT [FK_Transacao_Bandeira] FOREIGN KEY ([cd_bandeira])  REFERENCES [dbo].[Bandeira]([cd_bandeira]),
 CONSTRAINT [FK_Transacao_Modalidade] FOREIGN KEY ([cd_modalidade])  REFERENCES [dbo].[Modalidade]([cd_modalidade])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_34] ON [dbo].[Transacao]
 (
  [cd_arquivo] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_37] ON [dbo].[Transacao]
 (
  [cd_bandeira] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_40] ON [dbo].[Transacao]
 (
  [cd_modalidade] ASC
 )

GO

-- ************************************** [dbo].[Modalidade]
CREATE TABLE [dbo].[Modalidade]
(
 [cd_modalidade] int NOT NULL ,
 [descricao_modalidade] varchar(30) NOT NULL,

 CONSTRAINT [PK_Modalidade] PRIMARY KEY CLUSTERED ([cd_modalidade] ASC)
);
GO

-- ************************************** [dbo].[Bandeira_modalidade]
CREATE TABLE [dbo].[Bandeira_modalidade]
(
 [cd_bandeira]   int PRIMARY KEY ,
 [cd_modalidade] int PRIMARY KEY,

 CONSTRAINT [FK_48] FOREIGN KEY ([cd_bandeira])  REFERENCES [dbo].[Bandeira]([cd_bandeira]),
 CONSTRAINT [FK_51] FOREIGN KEY ([cd_modalidade])  REFERENCES [dbo].[Modalidade]([cd_modalidade])
);
GO

CREATE NONCLUSTERED INDEX [fkIdx_48] ON [dbo].[Bandeira_modalidade]
 (
  [cd_bandeira] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_51] ON [dbo].[Bandeira_modalidade]
 (
  [cd_modalidade] ASC
 )

GO