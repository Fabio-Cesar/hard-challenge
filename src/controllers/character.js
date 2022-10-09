import * as characterServices from '../services/character.js';

export async function createNewCharacter(req, res) {
    const { brand, name, rarity } = req.body;
    const result = await characterServices.createNewCharacter(brand, name, rarity)
    if (result.error === null) {
        res.status(201).json({ characterID: result.characterID})
    } else {
        res.status(result.status).json({ message: result.error })
    }
}

export async function createNewCharacterImage(req, res) {
    if (req.invalidFile) {
        return res.status(400).json({ message: 'Apenas imagens png e imagens jpg são permitidas!' })
    }
    return res.status(201).json({ message: 'Upload com sucesso'});
}