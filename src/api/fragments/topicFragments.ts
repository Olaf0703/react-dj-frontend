export const TopicFields = (studentId: number) => `
    id
    name
    report(student: ${ studentId }) {
        questionsAnswered
        correctQuestion
        accuracy
    }
    mastery(student: ${ studentId })
`

export const TopicsRecursive = (studentId: number) => `
    subTopics {
        ${ TopicFields(studentId) }
        subTopics {
            ${ TopicFields(studentId) }
            subTopics {
                ${ TopicFields(studentId) }
            }
        }
    }
`

export const TopicReport = (studentId: number, aokId: number) => `
    rootTopicsByAok(aokId: ${ aokId }) {
        ${ TopicFields(studentId) }
        ${ TopicsRecursive(studentId) }
    }
`

export const AreasOfKnowledge =() => `
    areasOfKnowledge {
        id
        name
    }
`
