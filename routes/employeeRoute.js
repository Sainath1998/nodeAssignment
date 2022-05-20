const express = require('express')
const router = express.Router()
const employeedb = require('../employeeDb/employeedb')

router.get('/',async (req, res)=>{
    const singleEmp = await employeedb.find()
    res.send(singleEmp)
})
// sort employees by seniority
router.get('/query1',async (req, res)=>{
    let respondingArray = []
    const senior = await employeedb.find({"designation": "Sr. Dev"})
    const pManager = await employeedb.find({"designation": "P Manager"})
    const tLead = await employeedb.find({"designation": "T Lead"})
    const dev = await employeedb.find({"designation": "Dev"})
    const intern = await employeedb.find({"designation": "Intern"})
    respondingArray.push(pManager)
    respondingArray.push(tLead)
    respondingArray.push(senior)
    respondingArray.push(dev)
    respondingArray.push(intern)
    res.send(respondingArray)
})

// update designation on particular date
router.get('/query2',async (req, res)=>{
    const seniorEmp = await employeedb.find({"designation": "Sr. Dev","DOJ":req.body.DOJ}).updateOne({"designation": "Sr. Dev"},{$set:{"designation": req.body.designation}})
    res.send(seniorEmp)
})

// count number of employees
router.get('/countemp', async (req, res)=>{
    const counter =  await employeedb.count()
    res.send("The number of employees are  " + counter)

})

// promote 3 employees
router.post('/promote',async (req,res)=>{
    const promoteEmp = await employeedb.find().updateOne({"designation": "Promoted"},{$set:{designation:req.body.designation}})
    res.send(promoteEmp)
})
// delete an employee
router.get('/delete',(req, res)=>{
        employeedb.deleteOne({"eID":req.body.eID}).then(()=>{
        res.send('Deleted')
    })
})
// get details of particular employee based on ID and ypdate its address
router.get('/details',async (req, res)=>{
    const detailOfOne = await employeedb.find({"eID":req.body.eID}).update({eAddress:req.body.eAddress})
    res.send(detailOfOne)
})
    

// add employees to the database
router.post('/',async (req, res)=>{
    const employee = new employeedb({
        eID:req.body.eID,
        eName:req.body.eName,
        eAddress:req.body.eAddress,
        designation:req.body.designation,
        DOJ:req.body.DOJ,
        DOR:req.body.DOR
    })
    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = router