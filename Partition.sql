USE cfbdb
GO
ALTER DATABASE cfbdb ADD FILEGROUP fg01_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg02_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg03_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg04_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg05_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg06_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg07_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg08_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg09_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg10_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg11_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg12_2017
ALTER DATABASE cfbdb ADD FILEGROUP fg01_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg02_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg03_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg04_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg05_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg06_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg07_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg08_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg09_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg10_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg11_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg12_2018
ALTER DATABASE cfbdb ADD FILEGROUP fg01_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg02_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg03_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg04_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg05_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg06_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg07_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg08_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg09_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg10_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg11_2019
ALTER DATABASE cfbdb ADD FILEGROUP fg12_2019
go





ALTER DATABASE cfbdb ADD FILE ( NAME = 'janeiro2017'  , FILENAME = N'C:\Projetos\CFB-partition\janeiro2017.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg01_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'fevereiro2017', FILENAME = 'C:\Projetos\CFB-partition\fevereiro2017.ndf' , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg02_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'marco2017'    , FILENAME = 'C:\Projetos\CFB-partition\marco2017.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg03_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'abril2017'    , FILENAME = 'C:\Projetos\CFB-partition\abril2017.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg04_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'maio2017'     , FILENAME = 'C:\Projetos\CFB-partition\maio2017.ndf'      , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg05_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'junho2017'    , FILENAME = 'C:\Projetos\CFB-partition\junho2017.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg06_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'julho2017'    , FILENAME = 'C:\Projetos\CFB-partition\julho2017.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg07_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'agosto2017'   , FILENAME = 'C:\Projetos\CFB-partition\agosto2017.ndf'    , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg08_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'setembro2017' , FILENAME = 'C:\Projetos\CFB-partition\setembro2017.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg09_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'outubro2017'  , FILENAME = 'C:\Projetos\CFB-partition\outubro2017.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg10_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'novembro2017' , FILENAME = 'C:\Projetos\CFB-partition\novembro2017.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg11_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'dezembro2017' , FILENAME = 'C:\Projetos\CFB-partition\dezembro2017.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg12_2017]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'janeiro2018'  , FILENAME = 'C:\Projetos\CFB-partition\janeiro2018.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg01_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'fevereiro2018', FILENAME = 'C:\Projetos\CFB-partition\fevereiro2018.ndf' , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg02_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'marco2018'    , FILENAME = 'C:\Projetos\CFB-partition\marco2018.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg03_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'abril2018'    , FILENAME = 'C:\Projetos\CFB-partition\abril2018.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg04_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'maio2018'     , FILENAME = 'C:\Projetos\CFB-partition\maio2018.ndf'      , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg05_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'junho2018'    , FILENAME = 'C:\Projetos\CFB-partition\junho2018.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg06_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'julho2018'    , FILENAME = 'C:\Projetos\CFB-partition\julho2018.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg07_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'agosto2018'   , FILENAME = 'C:\Projetos\CFB-partition\agosto2018.ndf'    , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg08_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'setembro2018' , FILENAME = 'C:\Projetos\CFB-partition\setembro2018.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg09_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'outubro2018'  , FILENAME = 'C:\Projetos\CFB-partition\outubro2018.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg10_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'novembro2018' , FILENAME = 'C:\Projetos\CFB-partition\novembro2018.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg11_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'dezembro2018' , FILENAME = 'C:\Projetos\CFB-partition\dezembro2018.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg12_2018]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'janeiro2019'  , FILENAME = 'C:\Projetos\CFB-partition\janeiro2019.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg01_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'fevereiro2019', FILENAME = 'C:\Projetos\CFB-partition\fevereiro2019.ndf' , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg02_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'marco2019'    , FILENAME = 'C:\Projetos\CFB-partition\marco2019.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg03_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'abril2019'    , FILENAME = 'C:\Projetos\CFB-partition\abril2019.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg04_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'maio2019'     , FILENAME = 'C:\Projetos\CFB-partition\maio2019.ndf'      , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg05_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'junho2019'    , FILENAME = 'C:\Projetos\CFB-partition\junho2019.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg06_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'julho2019'    , FILENAME = 'C:\Projetos\CFB-partition\julho2019.ndf'     , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg07_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'agosto2019'   , FILENAME = 'C:\Projetos\CFB-partition\agosto2019.ndf'    , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg08_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'setembro2019' , FILENAME = 'C:\Projetos\CFB-partition\setembro2019.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg09_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'outubro2019'  , FILENAME = 'C:\Projetos\CFB-partition\outubro2019.ndf'   , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg10_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'novembro2019' , FILENAME = 'C:\Projetos\CFB-partition\novembro2019.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg11_2019]
ALTER DATABASE cfbdb ADD FILE ( NAME = 'dezembro2019' , FILENAME = 'C:\Projetos\CFB-partition\dezembro2019.ndf'  , SIZE = 100MB , MAXSIZE = 32GB , FILEGROWTH = 100MB ) TO FILEGROUP [fg12_2019]
GO



if exists(select 1 from sys.objects where OBJECT_NAME(object_id) = 'TabelaGigante')
	DROP TABLE  dbo.TabelaGigante


if exists(select 1 from sys.partition_schemes where name = 'schParticionamentoPorAno')
	DROP PARTITION SCHEME  schParticionamentoPorAno


if exists(select 1 from sys.partition_functions where name = 'fnParticionamentoPorAno')
	DROP PARTITION FUNCTION [fnParticionamentoPorAno]


	
USE cfbdb
GO
CREATE PARTITION FUNCTION [fnParticionamentoPorAno](SMALLDATETIME) AS RANGE RIGHT FOR VALUES 
	(
	  --NAO ESPEFIQUE O PRIMEIRO INTERVALO (01/jan a 31/dez de 2005)
	  '20060101'
	, '20070101'
	, '20080101'
	, '20090101'
	, '20100101'
	, '20110101'
	, '20120101'
	, '20130101'
	, '20140101'
	, '20150101'
	, '20160101'
	, '20170101'
	, '20180101'
	, '20190101'
	, '20200101'
	, '20210101'
	, '20220101'
	, '20230101'
	, '20240101'
	, '20250101'
	, '20260101'
	, '20270101'
	)
GO
 

CREATE PARTITION SCHEME [schParticionamentoPorAno]
AS PARTITION [fnParticionamentoPorAno]
TO (
	  fg2005, fg2006, fg2007, fg2008, fg2009, fg2010 
	, fg2011, fg2012, fg2013, fg2014, fg2015, fg2016, fg2017, fg2018, fg2019, fg2020
	, fg2021, fg2022, fg2023, fg2024, fg2025, fg2026, fg2027
	)
GO

CREATE TABLE dbo.TabelaGigante
	(
	id      		INTEGER IDENTITY (1,1) ,
	dtTransacao    	SMALLDATETIME NOT NULL,
	fkProduto   	INTEGER NOT NULL,
	fkBrick  		INTEGER NOT NULL,
	fkLinha  		INTEGER NOT NULL,
	UNIDADES    	INTEGER NOT NULL,
	VALORREAL   	MONEY NOT NULL 
CONSTRAINT pkTbGiga PRIMARY KEY CLUSTERED (id, dtTransacao)
) ON schParticionamentoPorAno (dtTransacao)
GO

INSERT INTO dbo.TabelaGigante (
	  dtTransacao
	, fkProduto
	, fkBrick 
	, fkLinha
	, UNIDADES
	, VALORREAL
	)
SELECT *
FROM dbo.TabelaAntiga



SELECT 
	  OBJECT_NAME(p.object_id) AS  Tabela
	, p.partition_number AS ParticaoN
	, f.name AS ParticaoFilegroup
	, p.rows AS NumeroRegistros 
	--, p.
FROM sys.partitions p
JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
WHERE OBJECT_NAME(OBJECT_ID) = 'TabelaGigante'



SELECT YEAR(dtTransacao) AS ANO, COUNT(*) AS NumeroRegistros , MIN(dtTransacao) AS MINIMO, MAX(dtTransacao) AS MAXIMO
FROM dbo.TabelaGigante
GROUP BY YEAR(dtTransacao)
ORDER BY 1

SELECT YEAR(dtTransacao) AS ANO, COUNT(*) AS NumeroRegistros
FROM dbo.TabelaAntiga
GROUP BY YEAR(dtTransacao)
ORDER BY 1

ANO	    NumeroRegistros	MINIMO	            MAXIMO
2005	1080615	        2005-01-01 00:00:00	2005-12-21 00:00:00
2006	1040577      	2006-01-01 00:00:00	2006-12-21 00:00:00
2010	1080615     	2010-01-01 00:00:00	2010-12-21 00:00:00
2011	1040577      	2011-01-01 00:00:00	2011-12-21 00:00:00

2005	1	80373
2005	2	80913
2005	3	91377
2005	4	92088
2005	5	92433
2005	6	92643
2005	7	92835
2005	8	92970
2005	9	91677
2005	10	91479
2005	11	91137
2005	12	90690
2006	1	90072
2006	2	89517
2006	3	89322
2006	4	88836
2006	5	89328
2006	6	88929
2006	7	88605
2006	8	79110
2006	9	78954
2006	10	79176
2006	11	89232
2006	12	89496
2010	1	80373
2010	2	80913
2010	3	91377
2010	4	92088
2010	5	92433
2010	6	92643
2010	7	92835
2010	8	92970
2010	9	91677
2010	10	91479
2010	11	91137
2010	12	90690
2011	1	90072
2011	2	89517
2011	3	89322
2011	4	88836
2011	5	89328
2011	6	88929
2011	7	88605
2011	8	79110
2011	9	78954
2011	10	79176
2011	11	89232
2011	12	89496