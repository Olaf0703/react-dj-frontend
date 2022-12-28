export const UNIVERSAL_AOK = `
    {
        id
        identifier
        isActive
        name
        slug
        randomSlug
        deletedTimestamp
        createTimestamp
        updateTimestamp
    }
`;

export const UNIVERSAL_TOPIC = `
    {
        id
        identifier
        isActive
        randomSlug
        name
        slug
        standardCode
        lft
        rght
        treeId
        level
    }
`;

export const AREA_OF_KNOWLEDGE = `
        id
        identifier
        isActive
        randomSlug
        hexColor
        slug
        image
        islandImage
        name
`;

export const TOPIC = `
        id
        identifier
        isActive
        randomSlug
        lft
        rght
        treeId
        level
        name
        videoAssistor
`;

export const TOPIC_GRADE = `

        id
        identifier
        isActive
        randomSlug
        standardCode

`;

export const QUESTION = `
    id
    identifier
    isActive
    randomSlug
    questionText
    questionAudioUrl
`;

export const ANSWER_OPTION = `
    {
        id
        identifier
        randomSlug
        isCorrect
        answerText
        explanation
        image
        audioFile
        video
        answerAudioUrl
    }
`;

export const NEW_MC_ANSWER_OPTION = `
answerText
explanation
image
audioFile
video
`
export const NEW_T_ANSWER_OPTION = `
answerText
explanation
image
caseSensitive
audioFile
video
`

export const NEW_O_ANSWER_OPTION = `
order
answerText
image
audioFile
video
`

export const NEW_R_ANSWER_OPTION = `
key
value
keyImage
valueImage
`
