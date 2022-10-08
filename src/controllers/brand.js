import * as brandServices from '../services/brand.js'

export async function getBrands(req, res) {
    const result = await brandServices.getBrands()
    if(result.error === null) {
        res.status(200).json({ brands: result.brands })
    } else {
        res.status(result.status).json({ message: result.error })
    }
}

export async function createNewBrand(req, res) {
    const { name, series } = req.body ;
    const result = await brandServices.createNewBrand(name, series)
    if (result.error === null) {
        res.status(201).json({ message: 'Coleção criada com sucesso!'})
    } else {
        res.status(result.status).json({ message: result.error })
    }
}