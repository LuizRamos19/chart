--Criação tabela ajuste particionada
CREATE TABLE dbo.Ajuste
	(
	cd_ajuste   BIGINT IDENTITY NOT NULL,
	cd_ec       BIGINT NOT NULL,
	dt_referencia_arquivo  DATETIME NOT NULL,
	dt_ajuste   DATETIME NOT NULL,
	nsu         BIGINT NOT NULL,
	sequencia   INT NOT NULL,
	desc_ajuste VARCHAR (200) NOT NULL,
	cd_operacao CHAR (1) NOT NULL,
	valor       MONEY NOT NULL,

	CONSTRAINT PK_Ajuste PRIMARY KEY (cd_ajuste,dt_referencia_arquivo)
	) ON schParticao(dt_referencia_arquivo)
GO


IF EXISTS (SELECT * FROM sys.partition_schemes WHERE name = N'schParticao')
	DROP PARTITION SCHEME schParticao;
IF EXISTS (SELECT * FROM sys.partition_functions WHERE name = N'Particao')
	DROP PARTITION FUNCTION Particao;


-- Criação Partition function 
CREATE PARTITION FUNCTION Particao (DATETIME)
AS RANGE RIGHT FOR VALUES 
( 
 '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', 
 '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01',
 
 '2018-01-01', '2018-02-01', '2018-03-01', '2018-04-01', '2018-05-01', '2018-06-01', 
 '2018-07-01', '2018-08-01', '2018-09-01', '2018-10-01', '2018-11-01', '2018-12-01',
 
 '2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01', 
 '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01'

 );

-- Criação Partition Scheme
CREATE PARTITION SCHEME schParticao
AS PARTITION Particao
ALL TO 
		(

		FGjan2017, FGfev2017, FGmar2017, FGabr2017, FGmai2017, FGjun2017,
        FGjul2017, FGago2017, FGset2017, FGout2017, FGnov2017, FGdez2017,
        
        FGjan2018, FGfev2018, FGmar2018, FGabr2018, FGmai2018, FGjun2018,
        FGjul2018, FGago2018, FGset2018, FGout2018, FGnov2018, FGdez2018,
        
        FGjan2019, FGfev2019, FGmar2019, FGabr2019, FGmai2019, FGjun2019,
        FGjul2019, FGago2019, FGset2019, FGout2019, FGnov2019, FGdez2019
        
        );


-- Adds new filegroups to the cfbdb database  

--FG 2017
ALTER DATABASE cfbdb 
ADD FILEGROUP FGjan2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGfev2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGmar2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGabr2017; 
GO 
ALTER DATABASE cfbdb 
ADD FILEGROUP FGmai2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjun2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjul2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGago2017;
GO
ALTER DATABASE cfbdb 
ADD FILEGROUP FGset2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGout2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGnov2017;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGdez2017;


--FG 2018
ALTER DATABASE cfbdb 
ADD FILEGROUP FGjan2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGfev2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGmar2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGabr2018; 
GO 
ALTER DATABASE cfbdb 
ADD FILEGROUP FGmai2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjun2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjul2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGago2018;
GO
ALTER DATABASE cfbdb 
ADD FILEGROUP FGset2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGout2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGnov2018;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGdez2018;


--FG 2019
ALTER DATABASE cfbdb 
ADD FILEGROUP FGjan2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGfev2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGmar2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGabr2019; 
GO 
ALTER DATABASE cfbdb 
ADD FILEGROUP FGmai2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjun2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGjul2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGago2019;
GO
ALTER DATABASE cfbdb 
ADD FILEGROUP FGset2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGout2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGnov2019;  
GO  
ALTER DATABASE cfbdb  
ADD FILEGROUP FGdez2019;


-- Adds one file for each filegroup.  

--files 2017
ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = janeiro2017,  
    FILENAME = 'C:\Projetos\Filegroups\janeiro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjan2017;  

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = fevereiro2017,  
    FILENAME = 'C:\Projetos\Filegroups\fevereiro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGfev2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = marco2017,  
    FILENAME = 'C:\Projetos\Filegroups\marco2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmar2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = abril2017,  
    FILENAME = 'C:\Projetos\Filegroups\abril2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGabr2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = maio2017,  
    FILENAME = 'C:\Projetos\Filegroups\maio2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmai2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = junho2017,  
    FILENAME = 'C:\Projetos\Filegroups\junho2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjun2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = julho2017,  
    FILENAME = 'C:\Projetos\Filegroups\julho2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjul2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = agosto2017,  
    FILENAME = 'C:\Projetos\Filegroups\agosto2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGago2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = setembro2017,  
    FILENAME = 'C:\Projetos\Filegroups\setembro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGset2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = outubro2017,  
    FILENAME = 'C:\Projetos\Filegroups\outubro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGout2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = novembro2017,  
    FILENAME = 'C:\Projetos\Filegroups\novembro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGnov2017; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = dezembro2017,  
    FILENAME = 'C:\Projetos\Filegroups\dezembro2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGdez2017; 




--files 2018
ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = janeiro2018,  
    FILENAME = 'C:\Projetos\Filegroups\janeiro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjan2018;  

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = fevereiro2018,  
    FILENAME = 'C:\Projetos\Filegroups\fevereiro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGfev2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = marco2018,  
    FILENAME = 'C:\Projetos\Filegroups\marco2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmar2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = abril2018,  
    FILENAME = 'C:\Projetos\Filegroups\abril2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGabr2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = maio2018,  
    FILENAME = 'C:\Projetos\Filegroups\maio2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmai2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = junho2018,  
    FILENAME = 'C:\Projetos\Filegroups\junho2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjun2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = julho2018,  
    FILENAME = 'C:\Projetos\Filegroups\julho2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjul2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = agosto2018,  
    FILENAME = 'C:\Projetos\Filegroups\agosto2017.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGago2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = setembro2018,  
    FILENAME = 'C:\Projetos\Filegroups\setembro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGset2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = outubro2018,  
    FILENAME = 'C:\Projetos\Filegroups\outubro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGout2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = novembro2018,  
    FILENAME = 'C:\Projetos\Filegroups\novembro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGnov2018; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = dezembro2018,  
    FILENAME = 'C:\Projetos\Filegroups\dezembro2018.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGdez2018;




--files 2019
ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = janeiro2019,  
    FILENAME = 'C:\Projetos\Filegroups\janeiro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjan2019;  

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = fevereiro2019,  
    FILENAME = 'C:\Projetos\Filegroups\fevereiro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGfev2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = marco2019,  
    FILENAME = 'C:\Projetos\Filegroups\marco2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmar2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = abril2019,  
    FILENAME = 'C:\Projetos\Filegroups\abril2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGabr2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = maio2019,  
    FILENAME = 'C:\Projetos\Filegroups\maio2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGmai2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = junho2019,  
    FILENAME = 'C:\Projetos\Filegroups\junho2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjun2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = julho2019,  
    FILENAME = 'C:\Projetos\Filegroups\julho2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGjul2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = agosto2019,  
    FILENAME = 'C:\Projetos\Filegroups\agosto2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGago2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = setembro2019,  
    FILENAME = 'C:\Projetos\Filegroups\setembro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGset2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = outubro2019,  
    FILENAME = 'C:\Projetos\Filegroups\outubro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGout2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = novembro2019,  
    FILENAME = 'C:\Projetos\Filegroups\novembro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGnov2019; 

ALTER DATABASE cfbdb   
ADD FILE   
(  
    NAME = dezembro2019,  
    FILENAME = 'C:\Projetos\Filegroups\dezembro2019.ndf',  
    SIZE = 5MB,  
    MAXSIZE = 100MB,  
    FILEGROWTH = 5MB  
)  
TO FILEGROUP FGdez2019;




-- View Partitioned Table information
SELECT
	OBJECT_SCHEMA_NAME(pstats.object_id) AS SchemaName
	,OBJECT_NAME(pstats.object_id) AS TableName
	,ps.name AS PartitionSchemeName
	,ds.name AS PartitionFilegroupName
	,pf.name AS PartitionFunctionName
	,CASE pf.boundary_value_on_right WHEN 0 THEN 'Range Left' ELSE 'Range Right' END AS PartitionFunctionRange
	,CASE pf.boundary_value_on_right WHEN 0 THEN 'Upper Boundary' ELSE 'Lower Boundary' END AS PartitionBoundary
	,prv.value AS PartitionBoundaryValue
	,c.name AS PartitionKey
	,CASE 
		WHEN pf.boundary_value_on_right = 0 
		THEN c.name + ' > ' + CAST(ISNULL(LAG(prv.value) OVER(PARTITION BY pstats.object_id ORDER BY pstats.object_id, pstats.partition_number), 'Infinity') AS VARCHAR(100)) + ' and ' + c.name + ' <= ' + CAST(ISNULL(prv.value, 'Infinity') AS VARCHAR(100)) 
		ELSE c.name + ' >= ' + CAST(ISNULL(prv.value, 'Infinity') AS VARCHAR(100))  + ' and ' + c.name + ' < ' + CAST(ISNULL(LEAD(prv.value) OVER(PARTITION BY pstats.object_id ORDER BY pstats.object_id, pstats.partition_number), 'Infinity') AS VARCHAR(100))
	END AS PartitionRange
	,pstats.partition_number AS PartitionNumber
	,pstats.row_count AS PartitionRowCount
	,p.data_compression_desc AS DataCompression
FROM sys.dm_db_partition_stats AS pstats
INNER JOIN sys.partitions AS p ON pstats.partition_id = p.partition_id
INNER JOIN sys.destination_data_spaces AS dds ON pstats.partition_number = dds.destination_id
INNER JOIN sys.data_spaces AS ds ON dds.data_space_id = ds.data_space_id
INNER JOIN sys.partition_schemes AS ps ON dds.partition_scheme_id = ps.data_space_id
INNER JOIN sys.partition_functions AS pf ON ps.function_id = pf.function_id
INNER JOIN sys.indexes AS i ON pstats.object_id = i.object_id AND pstats.index_id = i.index_id AND dds.partition_scheme_id = i.data_space_id AND i.type <= 1 /* Heap or Clustered Index */
INNER JOIN sys.index_columns AS ic ON i.index_id = ic.index_id AND i.object_id = ic.object_id AND ic.partition_ordinal > 0
INNER JOIN sys.columns AS c ON pstats.object_id = c.object_id AND ic.column_id = c.column_id
LEFT JOIN sys.partition_range_values AS prv ON pf.function_id = prv.function_id AND pstats.partition_number = (CASE pf.boundary_value_on_right WHEN 0 THEN prv.boundary_id ELSE (prv.boundary_id+1) END)
WHERE pstats.object_id = OBJECT_ID('Ajuste')
ORDER BY TableName, PartitionNumber;

-- exibindo numero de registros por partição
SELECT 
	DISTINCT
	  OBJECT_NAME(p.object_id) AS  Tabela
	, p.partition_number AS ParticaoNumero
	, f.name AS ParticaoFilegroup
	, p.rows AS NumeroRegistros 
FROM sys.partitions p
JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
WHERE OBJECT_NAME(OBJECT_ID) = 'Transacao'
ORDER BY p.partition_number

SELECT COUNT(DT_AJUSTE) FROM Ajuste WHERE MONTH(DT_AJUSTE) = 7 AND YEAR(DT_AJUSTE) = 2017

--verificar partição de transações
SELECT *, $Partition.Particao(dt_referencia_arquivo) AS Particao
FROM dbo.[Transacao] WHERE  month(dt_referencia_arquivo) = 06 and year(dt_referencia_arquivo) <= 2019

SELECT *, $Partition.Particao(dt_referencia_arquivo) AS Particao
FROM dbo.[Ajuste] WHERE  month(dt_referencia_arquivo) = 07 and year(dt_referencia_arquivo) <= 2018







