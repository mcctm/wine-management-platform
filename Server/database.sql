-- Database and Schema Creation 

CREATE DATABASE winemakerapp;

-- This command is for postgresql to connect to winemakerapp database
-- Comment out for non-postgresql users
\c winemakerapp

CREATE SCHEMA public;

CREATE TABLE Viticulturist(
	employeeID        INTEGER PRIMARY KEY,
	name              CHAR(50) NOT NULL,
	yearsOfExperience INTEGER
);

CREATE TABLE Winemaker(
	employeeId        INTEGER PRIMARY KEY,
	name              CHAR(50) NOT NULL,
	certificationYear INTEGER
);

CREATE TABLE WineBatch(
	batchID          INTEGER PRIMARY KEY,
	fermentationTime INTEGER
);

CREATE TABLE Produces(
	employeeID INTEGER,
	batchID    INTEGER,
	PRIMARY KEY (employeeID, batchID),
	FOREIGN KEY (employeeID) REFERENCES Winemaker,
	FOREIGN KEY (batchID)    REFERENCES WineBatch
);

CREATE TABLE Grapes_Makes(
	clusterID  INTEGER,
	batchID    INTEGER,
	type       CHAR(50),
	datePicked DATE,
	PRIMARY KEY (clusterID, batchID),
	FOREIGN KEY (batchID) REFERENCES WineBatch
);

CREATE TABLE Grows(
	employeeID INTEGER,
	clusterID  INTEGER,
  	batchID    INTEGER,
	season     CHAR(50),
	PRIMARY KEY (employeeID, clusterID, batchID),
	FOREIGN KEY (employeeID) REFERENCES Viticulturist,
	FOREIGN KEY (clusterID, batchID)  REFERENCES Grapes_Makes
);

CREATE TABLE Fertilizer(
	fertilizerName CHAR(50) PRIMARY KEY,
	fertilizerType CHAR(50)
);

CREATE TABLE WoodSupplier(
	companyName CHAR(50) PRIMARY KEY,
	phoneNumber CHAR(12) UNIQUE
);

CREATE TABLE Barrel_ProducedBy_Stores(
	barrelID    INTEGER  PRIMARY KEY,
	batchID     INTEGER  NOT NULL,
	companyName CHAR(50) NOT NULL,
	woodType    CHAR(50),
	size        INTEGER,
	FOREIGN KEY (batchID) REFERENCES WineBatch
		ON DELETE NO ACTION,
	FOREIGN KEY (companyName) REFERENCES WoodSupplier
		ON DELETE NO ACTION
);

CREATE TABLE Yeast(
  	yeastID INTEGER PRIMARY KEY,
	yeastType      CHAR(50)
);

CREATE TABLE Ferment(
  	batchID INTEGER,
	yeastID INTEGER,
	PRIMARY KEY (batchID, yeastID),
	FOREIGN KEY (batchID) REFERENCES WineBatch,
	FOREIGN KEY (yeastID) REFERENCES Yeast
);

CREATE TABLE WineBottle_ComesFrom(
  	bottleID INTEGER PRIMARY KEY,
	batchID  INTEGER NOT NULL,
  	year     INTEGER,
	FOREIGN KEY (batchID) REFERENCES WineBatch
    ON DELETE NO ACTION
);

CREATE TABLE WineBatch_Type(
  	batchID      INTEGER  PRIMARY KEY,
	wineType     CHAR(50),
	alcoholLevel INTEGER,
	FOREIGN KEY (batchID) REFERENCES WineBatch
);

CREATE TABLE QualityTest_Has(
  	bottleID      INTEGER,
	testID        INTEGER,
	tannins       INTEGER,
  	acidity       NUMERIC(18, 1),
  	score         INTEGER,
	PRIMARY KEY (bottleID, testID),
	FOREIGN KEY (bottleID) REFERENCES WineBottle_ComesFrom
		ON DELETE CASCADE
);

-- Table Population

INSERT INTO Viticulturist(employeeID, name, yearsOfExperience)
VALUES(1, 'Anne', 1),
   (2, 'Bob', 3),
   (3, 'Carmen', 2),
   (4, 'Dona', 10),
   (5, 'Emma', 8),
   (6, 'Fae', 3);

INSERT INTO WineMaker(employeeId, name, certificationYear)
VALUES(6, 'Morgan', 2013),
   (7, 'Nigel', 2021),
   (8, 'Peggy', 1997),
   (9, 'Jessica', 2000),
   (10, 'Cole', 2015);

INSERT INTO WineBatch(batchID, fermentationTime)
VALUES (1, 20),
	   (2, 30),
	   (3, 40),
       (4, 10),
       (5, 22),
			 (6, 40);

INSERT INTO Grapes_Makes(clusterID, batchID, type, datePicked)
VALUES (1, 1, 'Cabernet Sauvignon', CAST('1998-09-09' AS DATE)),
	   (2, 2, 'Cabernet Sauvignon', CAST('1998-09-11' AS DATE)),
	   (3, 3, 'Chardonnay', CAST('2010-06-22' AS DATE)),
	   (4, 3, 'Pinot Gris', CAST('2009-11-24' AS DATE)),
	   (5, 4, 'Merlot', CAST('2015-04-10' AS DATE)),
	   (6, 5, 'Pinot Noir', CAST('2022-03-20' AS DATE)),
		 (7, 6, 'Pinot Gris', CAST('2007-11-22' AS DATE)),
		 (8, 6, 'Chardonnay', CAST('2007-11-26' AS DATE));

INSERT INTO Grows(employeeID, clusterID, batchID, season)
VALUES  (1, 1, 1, 'Spring'),
		(1, 2, 2, 'Summer'),
		(1, 3, 3, 'Fall'),
		(1, 4, 3, 'Winter'),
		(1, 5, 4, 'Summer'),
		(1, 6, 5, 'Summer'),
		(2, 2, 2, 'Summer'),
		(3, 3, 3, 'Fall'),
		(4, 1, 1, 'Spring'),
		(4, 2, 2, 'Summer'),
		(4, 3, 3, 'Fall'),
		(4, 4, 3, 'Winter'),
		(4, 5, 4, 'Winter'),
		(4, 6, 5, 'Summer'),
		(5, 5, 4, 'Summer'),
		(6, 6, 5, 'Summer'),
		(1, 7, 6, 'Summer'),
		(4, 8, 6, 'Summer'),
		(1, 8, 6, 'Summer'),
		(4, 7, 6, 'Summer');

INSERT INTO Fertilizer(fertilizerName, fertilizerType)
VALUES ('UreaFertilizer', 'Urea'),
	   ('NitrateFertilizer', 'Ammonium Nitrate'),
	   ('SulfateFertilizer', 'Ammonium Sulfate'),
	   ('ZincFertilizer', 'Zinc'),
	   ('RabbitFertilizer', 'Manure');
       
INSERT INTO WoodSupplier(companyName, phoneNumber)
VALUES ('WoodsRUs', '345-292-0109'),
	   ('YWoodU', '433-493-2934'),
	   ('Woody', '530-349-2009'),
	   ('WoodMood', '400-304-1991'),
	   ('WoodYouBuy', '139-234-0101');

INSERT INTO Barrel_ProducedBy_Stores(barrelID, batchID, companyName, woodType, size)
VALUES (1, 1, 'WoodsRUs', 'Irish Oak', 200),
	   (2, 2, 'YWoodU', 'French Common Oak', 300),
	   (3, 3, 'Woody', 'American White Oak', 225),
	   (4, 4, 'WoodMood', 'Sessile Oak', 350),
	   (5, 5, 'WoodYouBuy', 'Mongolian Oak', 550);

INSERT INTO Yeast(yeastID, yeastType)
VALUES (1, 'Brettanomyces'),
	   (2, 'Saccharomycode'),
	   (3, 'Aureobasidium'),
	   (4, 'Brettanomyces'),
	   (5, 'Kloeckera'),
	   (6, 'Saccharomycode');

INSERT INTO Ferment(batchID, yeastID)
VALUES (1, 2),
	   (1, 3),
	   (2, 1),
	   (3, 4),
	   (4, 5),
	   (5, 6),
	   (6, 5);

INSERT INTO WineBottle_ComesFrom(bottleID, batchID, year)
VALUES (1, 1, 1999),
	   (2, 2, 2000),
	   (3, 3, 2015),
	   (4, 3, 2016),
	   (5, 4, 2017),
       (6, 5, 2022),
			 (7, 6, 2010);

INSERT INTO WineBatch_Type(batchID, wineType, alcoholLevel)
VALUES (1, 'Cabernet Sauvignon', 13),
	   (2, 'Cabernet Sauvignon', 13),
	   (3, 'Chardonnay-Pinot Gris', 8),
	   (4, 'Merlot', 10),
       (5, 'Pinot Noir', 15), 
			 (6, 'Chardonnay-Pinot Gris', 7);

INSERT INTO QualityTest_Has(bottleID, testID, tannins, acidity, score)
VALUES (1, 1, 10, 2.5, 95),
       (1, 2, 10, 2.2, 90),
       (2, 1, 20, 4.0, 80),
       (3, 1, 15, 3.1, 85),
       (3, 2, 15, 3.4, 67),
       (4, 1, 7, 5.0, 93),
       (5, 1, 18, 4.2, 78);