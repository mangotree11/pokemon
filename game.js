const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in Pallet Town in Professor Oaks lab. Who do you choose?',
        options: [
            {
                text: 'Charmander',
                setState: { chooseCharmander: true },
                nextText: 2
            },
            {
                text: 'Squirtle',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You select your Pokemon and venture on outside.',
        options: [
            {
                text: 'Take the bridge',
                requiredState: (currentState) => currentState.chooseCharmander,
                setState: { chooseCharmander: false, chooseSquirtle: true },
                nextText: 3
            },
            {
                text: 'Walk through the fields',
                requiredState: (currentState) => currentState.chooseCharmander,
                setState: { chooseCharmander: false, chooseBulbasaur: true },
                nextText: 3
            },
            {
                text: 'Tie your shoelaces',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After venturing outside you stumble against a wild Pokemon!',
        options: [
            {
                text: 'Fight',
                nextText: 4
            },
            {
                text: 'Run',
                nextText: 5
            },
            {
                text: 'Blame Dr. Oak',
                nextText: 6
            }
        ]
    },
    {
        id: 4, 
        text: "Fight!",
        options: [
            {
                text: 'Use Scratch',
                nextText: -1
            }
        ]
    }
]

startGame()