const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { request } = require("express");

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//ROUTES//

/* Search (SELECTION) */
// select all table data based on selected table
app.get("/search/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    const tableData = await pool.query(`SELECT * FROM ${tableName}`);

    res.json(tableData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// select with input-based search
app.get("/search/:tableName/:attribute/:value", async (req, res) => {
  try {
    const { tableName, attribute, value } = req.params;
    if (!Number.isNaN(parseInt(value))) {
      let selectedRows = await pool.query(
        `SELECT * FROM ${tableName} WHERE ${attribute} = ${value}`
      );
      res.json(selectedRows.rows);
    } else {
      let selectedRows = await pool.query(
        `SELECT * FROM ${tableName} WHERE ${attribute} iLIKE '${value}%'`
      );
      res.json(selectedRows.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//select winemakers by year (SELECTION)
// <= 1999
app.get("/search/winemaker/opt1", async (req, res) => {
  try {
    const winemaker = await pool.query(
      "SELECT * FROM Winemaker WHERE certificationYear <= 1999"
    );
    res.json(winemaker.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 2000-2009
app.get("/search/winemaker/opt2", async (req, res) => {
  try {
    const winemaker = await pool.query(
      "SELECT * FROM Winemaker WHERE certificationYear >= 2000 AND certificationYear < 2010"
    );
    res.json(winemaker.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 2010-2019
app.get("/search/winemaker/opt3", async (req, res) => {
  try {
    const winemaker = await pool.query(
      "SELECT * FROM Winemaker WHERE certificationYear >= 2010 AND certificationYear < 2020"
    );
    res.json(winemaker.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// >=2020
app.get("/search/winemaker/opt4", async (req, res) => {
  try {
    const winemaker = await pool.query(
      "SELECT * FROM Winemaker WHERE certificationYear >= 2020"
    );
    res.json(winemaker.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//select viticulturist by year (SELECTION)
// <= 2
app.get("/search/viticulturist/opt5", async (req, res) => {
  try {
    const viticulturist = await pool.query(
      "SELECT * FROM Viticulturist WHERE yearsOfExperience <= 2"
    );
    res.json(viticulturist.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 3-5
app.get("/search/viticulturist/opt6", async (req, res) => {
  try {
    const viticulturist = await pool.query(
      "SELECT * FROM Viticulturist WHERE yearsOfExperience BETWEEN 3 AND 5"
    );
    res.json(viticulturist.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 5+
app.get("/search/viticulturist/opt7", async (req, res) => {
  try {
    const viticulturist = await pool.query(
      "SELECT * FROM Viticulturist WHERE yearsOfExperience > 5"
    );
    res.json(viticulturist.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//select grapes by wine type (red or white)
app.get("/search/grapes_makes/opt8", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE type = 'Cabernet Sauvignon' OR type = 'Merlot' OR type = 'Pinot Noir'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/search/grapes_makes/opt9", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE type = 'Chardonnay' OR type = 'Pinot Gris'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// search grapes by date range
// <= 1999/12/31
app.get("/search/grapes_makes/opt10", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE datePicked <= '1999/12/31'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 2000/01/01 - 2009/12/31
app.get("/search/grapes_makes/opt11", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE datePicked BETWEEN '2000/01/01' AND '2009/12/31'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 2010/01/01 - 2019/12/31
app.get("/search/grapes_makes/opt12", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE datePicked BETWEEN '2010/01/01' AND '2019/12/31'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// >= 2020/01/01
app.get("/search/grapes_makes/opt13", async (req, res) => {
  try {
    const grapes = await pool.query(
      "SELECT * FROM Grapes_Makes WHERE datePicked >= '2020/01/01'"
    );
    res.json(grapes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// select wine batch by fermentation time range
app.get("/search/winebatch/opt14", async (req, res) => {
  try {
    const batch = await pool.query(
      "SELECT * FROM WineBatch WHERE fermentationTime < 20"
    );
    res.json(batch.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/search/winebatch/opt15", async (req, res) => {
  try {
    const batch = await pool.query(
      "SELECT * FROM WineBatch WHERE fermentationTime BETWEEN 20 AND 30"
    );
    res.json(batch.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/search/winebatch/opt16", async (req, res) => {
  try {
    const batch = await pool.query(
      "SELECT * FROM WineBatch WHERE fermentationTime > 30"
    );
    res.json(batch.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Employees */
//create a new winemaker (INSERT)
app.post("/employees", async (req, res) => {
  try {
    const { employeeId, name, certificationYear } = req.body;
    const newWinemaker = await pool.query(
      "INSERT INTO Winemaker VALUES($1, $2, $3) RETURNING *",
      [employeeId, name, certificationYear]
    );

    res.json(newWinemaker.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all winemakers
app.get("/employees", async (req, res) => {
  try {
    const allWinemakers = await pool.query("SELECT * FROM Winemaker");

    res.json(allWinemakers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get one winemaker
app.get("/employees/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const winemaker = await pool.query(
      "SELECT * FROM Winemaker WHERE employeeId = $1",
      [employeeId]
    );
    res.json(winemaker.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a winemaker (UPDATE)
app.put("/employees/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { name, certificationYear } = req.body;
    const updateWinemaker = await pool.query(
      "UPDATE Winemaker SET employeeId = $1, name = $2, certificationYear = $3 WHERE employeeId = $1",
      [employeeId, name, certificationYear]
    );

    res.json("Updated Winemaker");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a winemaker (DELETE without ON CASCADE)
app.delete("/employees/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const deleteWinemaker = await pool.query(
      "DELETE FROM Winemaker WHERE employeeId = $1",
      [employeeId]
    );

    res.json("Deleted Winemaker");
  } catch (err) {
    console.error(err.message);
  }
});

/* Suppliers */

// get all wine batch ID (for dropdown selection)
app.get("/suppliers", async (req, res) => {
  try {
    const allWineBatches = await pool.query(
      "SELECT DISTINCT B.batchID FROM WoodSupplier W, Barrel_ProducedBy_Stores B WHERE B.companyName = W.companyName"
    );

    res.json(allWineBatches.rows);
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
});

// JOIN - find companyName, phoneNumber of woodsupplier who produced barrels and wood type and size for winebatch
app.get("/suppliers/:batchID", async (req, res) => {
  try {
    const { batchID } = req.params;
    const getWoodSupplier = await pool.query(
      "SELECT DISTINCT W.companyName, W.phoneNumber, B.woodType, B.size FROM WoodSupplier W, Barrel_ProducedBy_Stores B WHERE B.companyName = W.companyName AND B.batchID = $1",
      [batchID]
    );

    res.json(getWoodSupplier.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Grape Production */
// aggregation GroupBy - count the number of clusters grouped by seasons
app.get("/grapeProduction/countClustersBySeasons/all", async (req, res) => {
  try {
    const countClustersBySeasons = await pool.query(
      "SELECT COUNT(*), season FROM Grows GROUP BY season ORDER BY season ASC"
    );
    res.json(countClustersBySeasons.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// aggregation selection (fall)
app.get("/grapeProduction/countClustersBySeasons/fall", async (req, res) => {
  try {
    const countClustersBySeasons = await pool.query(
      "SELECT COUNT(*), season FROM Grows GROUP BY season ORDER BY season ASC"
    );
    res.json(countClustersBySeasons.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// aggregation selection (spring)
app.get("/grapeProduction/countClustersBySeasons/spring", async (req, res) => {
  try {
    const countClustersBySeasons = await pool.query(
      "SELECT COUNT(*), season FROM Grows GROUP BY season ORDER BY season ASC"
    );
    res.json(countClustersBySeasons.rows[1]);
  } catch (error) {
    console.log(error.message);
  }
});

// aggregation selection (summer)
app.get("/grapeProduction/countClustersBySeasons/summer", async (req, res) => {
  try {
    const countClustersBySeasons = await pool.query(
      "SELECT COUNT(*), season FROM Grows GROUP BY season ORDER BY season ASC"
    );
    res.json(countClustersBySeasons.rows[2]);
  } catch (error) {
    console.log(error.message);
  }
});

// aggregation selection (winter)
app.get("/grapeProduction/countClustersBySeasons/winter", async (req, res) => {
  try {
    const countClustersBySeasons = await pool.query(
      "SELECT COUNT(*), season FROM Grows GROUP BY season ORDER BY season ASC"
    );
    res.json(countClustersBySeasons.rows[3]);
  } catch (error) {
    console.log(error.message);
  }
});

// division - find viticulturists who's grown grapes for all grape clusters
app.get("/grapeProduction/grownAllClusters", async (req, res) => {
  try {
    const viticulturistInfo = await pool.query(
      "SELECT v.employeeID, v.name FROM Viticulturist v WHERE NOT EXISTS ((SELECT DISTINCT g.clusterID FROM Grapes_Makes g) EXCEPT (SELECT DISTINCT g.clusterID FROM Grapes_Makes gm, Grows g WHERE gm.clusterID = g.clusterID AND v.employeeID = g.employeeID))"
    );
    res.json(viticulturistInfo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

/* Wine Production */

// displays all wine production info (from Ferment, WineBatch, WineBatch_Type, Yeast) for GUI
app.get("/wineProduction", async (req, res) => {
  try {
    const allWineProdInfo = await pool.query(
      "SELECT * FROM WineBatch w, WineBatch_Type wb, Yeast y, Ferment f WHERE f.batchID = w.batchID AND f.yeastID = y.yeastID AND wb.batchID = f.batchID"
    );

    res.json(allWineProdInfo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// PROJECTION (able to project attributes from relations: ferment, winebatch, winebatch_type and yeast)

// projecting 1 attribute
app.get("/wineProduction/:column1", async (req, res) => {
  try {
    let { column1 } = req.params;

    if (column1.toLowerCase() === "batchid") {
      column1 = "f.batchID";
    } else if (column1.toLowerCase() === "yeastid") {
      column1 = "f.yeastID";
    }

    const requestedColumn = await pool.query(
      "SELECT DISTINCT " +
        column1 +
        " FROM WineBatch w, WineBatch_Type wb, Yeast y, Ferment f WHERE f.batchID = w.batchID AND f.yeastID = y.yeastID AND wb.batchID = f.batchID"
    );

    res.json(requestedColumn.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// projecting 2 attributes
app.get("/wineProduction/:column1/:column2", async (req, res) => {
  try {
    let { column1 } = req.params;
    let { column2 } = req.params;

    const list = [column1, column2];

    list.forEach((col, index) => {
      if (col.toLowerCase() === "batchid") {
        list[index] = "f.batchID";
      } else if (col.toLowerCase() === "yeastid") {
        list[index] = "f.yeastID";
      }
    });

    column1 = list[0];
    column2 = list[1];

    const requestedColumn = await pool.query(
      "SELECT DISTINCT " +
        column1 +
        ", " +
        column2 +
        " FROM WineBatch w, WineBatch_Type wb, Yeast y, Ferment f WHERE f.batchID = w.batchID AND f.yeastID = y.yeastID AND wb.batchID = f.batchID"
    );

    res.json(requestedColumn.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// projecting 3 attributes
app.get("/wineProduction/:column1/:column2/:column3", async (req, res) => {
  try {
    let { column1 } = req.params;
    let { column2 } = req.params;
    let { column3 } = req.params;

    const list = [column1, column2, column3];

    list.forEach((col, index) => {
      if (col.toLowerCase() === "batchid") {
        list[index] = "f.batchID";
      } else if (col.toLowerCase() === "yeastid") {
        list[index] = "f.yeastID";
      }
    });

    column1 = list[0];
    column2 = list[1];
    column3 = list[2];

    const requestedColumn = await pool.query(
      "SELECT DISTINCT " +
        column1 +
        ", " +
        column2 +
        ", " +
        column3 +
        " FROM WineBatch w, WineBatch_Type wb, Yeast y, Ferment f WHERE f.batchID = w.batchID AND f.yeastID = y.yeastID AND wb.batchID = f.batchID"
    );

    res.json(requestedColumn.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/* Wine Type Table */

//Get All wines batches by type
app.get("/winebatchtype", async (req, res) => {
  try {
    const allWineTypes = await pool.query("SELECT * FROM WineBatch_Type");

    res.json(allWineTypes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Nested aggregation: Finds the wineType with the lowest average alcohol content of all wineTypes in the table.
app.get("/winebottlescorenested", async (req, res) => {
  try {
    const wineBottlesScored = await pool.query(
      "SELECT T1.wineType, avg(T1.alcoholLevel) FROM WineBatch_Type T1 GROUP BY T1.wineType HAVING avg(T1.alcoholLevel) <= ALL (SELECT avg(T2.alcoholLevel) FROM WineBatch_Type T2 GROUP BY T2.wineType)"
    );
    res.json(wineBottlesScored.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Wine Bottle and Quality Test */

//ON DELETE CASCADE: QualityTest depends on WineBottle
//delete a wineBottle (also deletes corresponding row in QualityTest)
app.delete("/winebottle/:bottleId", async (req, res) => {
  try {
    const { bottleId } = req.params;
    const deleteWineBottle = await pool.query(
      "DELETE FROM WineBottle_ComesFrom WHERE bottleId = $1",
      [bottleId]
    );

    res.json("Deleted Winemaker");
  } catch (err) {
    console.error(err.message);
  }
});

// Aggregation using HAVING: Returns the average score for each wine bottle that has more than one test.
app.get("/winebottlescorehaving", async (req, res) => {
  try {
    const wineBottlesScored = await pool.query(
      "SELECT B.bottleID, avg(Q.score) FROM WineBottle_ComesFrom B, QualityTest_Has Q WHERE B.bottleID = Q.bottleID GROUP BY B.bottleID HAVING COUNT(*) > 1"
    );
    res.json(wineBottlesScored.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Returns a JOIN on QualityTest_Has and WineBottle_ComesFrom tables
app.get("/qualitytests-wine", async (req, res) => {
  try {
    const allQTs = await pool.query(
      "SELECT WineBottle_ComesFrom.bottleID, WineBottle_ComesFrom.batchID, QualityTest_Has.testID, QualityTest_Has.tannins, QualityTest_Has.acidity, QualityTest_Has.score FROM WineBottle_ComesFrom, QualityTest_Has WHERE WineBottle_ComesFrom.bottleID = QualityTest_Has.bottleID"
    );
    res.json(allQTs.rows);
  } catch (err) {
    console.error(err.message);
  }
});
