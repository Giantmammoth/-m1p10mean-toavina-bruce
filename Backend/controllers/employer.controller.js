const Employer = require ("../models/employer.model")

exports.newEmployer = async (req, res) => {
    try{
        const employee = new Employer({
            ...req.body
        })

        await employee.save()
        return res.status(200).send({message: "New employee added !"})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

exports.getAllEmployer = async (req, res) => {
    try{
        const employee = await Employer.find({})
        return res.status(200).send({data: employee})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}