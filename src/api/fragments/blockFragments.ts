export const BLOCK_CONFIGURATION_KEYWORD = `
    {
        id
        isActive
        name
    }
`;

export const BLOCK_TYPE = `

        id
        identifier
        isActive
        randomSlug
        name

`;

export const BLOCK_TYPE_CONFIGURATION = `

        id
        isActive
        value

`;

export const BLOCK = `
        id
        identifier
        isActive
        randomSlug
        createTimestamp
        updateTimestamp
        modality
        blockSize
        experiencePointsAvailable
        coinsAvailable
`;

export const BLOCK_PRESENTATON = `
        id
        identifier
        isActive
        randomSlug
        hits
        errors
        total
        points
        bonusCoins
        coins
`;

export const BLOCK_QUESTION = `
    {
        id
        identifier
        randomSlug
        isCorrect
        isAnswered
    }
`;

export const BLOCK_QUESTION_PRESENTATION = `

        id
        identifier
        randomSlug

`;

export const QUESTION_IMAGE_ASSETS = `
{
        id
        identifier
        randomSlug
        image
}
`
export const QUESTION_AUDIO_ASSETS = `
{
        id
        identifier
        randomSlug
        order
        createTimestamp
        updateTimestamp
        audioFile
}`
