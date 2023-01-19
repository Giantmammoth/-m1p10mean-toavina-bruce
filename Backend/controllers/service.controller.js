const Service =  require('../models/service.model')

exports.addNewService = async (req, res) => {
    try{
        let serviceArr = []

        const service = new Service({
            ...req.body
        })

        await service.save(); 
        return res.status(200).send({ message: 'Service créer avec succès' });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }

}

exports.deleteService = async (req, res) => {
    try{
        await Service.findOneAndDelete({_id: req.params.id})

        return res.status(200).send({ message: 'Service supprimé avec succès' });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

exports.updateService = async (req, res) => {
    try{
        const service = await Service.findById(req.params.id)
        if (!service)
            return res.status(404).send({message: "Service not found"})

        const newservice = new Service({
            _id : service._id,
            ...req.body
        })

        await Service.updateOne({_id: service._id}, newservice)
        return res.status(200).send({ message: 'Service mise a jour avec succès' });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}