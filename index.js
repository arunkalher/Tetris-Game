
//globals
let row_start = 1
let gamestarted = false
let col_start = 6
let buttonEvent = null
let score = 0
let speed = 300
let scoreElement = document.getElementById("score")
let filledArray = new Array(21)
for (let i = 0; i <= 20; i++) {
    filledArray[i] = new Array(16).fill(0)
}
let timer = null
let shapes = [
    //    | 
    //    |--
    //    |
    [[row_start - 3, col_start], [row_start - 2, col_start], [row_start - 2, col_start + 1], [row_start - 1, col_start], [0, 1]],

    //    |
    //    |
    //    |
    [[row_start - 4, col_start], [row_start - 3, col_start], [row_start - 2, col_start], [row_start - 1, col_start], [0, 2]],

    //  ---
    //  | |
    //  ---
    [[row_start - 2, col_start], [row_start - 2, col_start + 1], [row_start - 1, col_start], [row_start - 1, col_start + 1], [0, 3]],
    //  |
    //   -
    //    |
    [[row_start - 3, col_start - 1], [row_start - 2, col_start - 1], [row_start - 2, col_start], [row_start - 1, col_start], [0, 4]],
    //    | 
    //   -
    //  | 
    [[row_start - 3, col_start + 1], [row_start - 2, col_start + 1], [row_start - 2, col_start], [row_start - 1, col_start], [0, 5]],
    //    | 
    //    |
    //    |_
    [[row_start - 3, col_start - 1], [row_start - 2, col_start - 1], [row_start - 1, col_start - 1], [row_start - 1, col_start], [0, 6]],
    //   | 
    //    |
    //   _|
    [[row_start - 3, col_start + 1], [row_start - 2, col_start + 1], [row_start - 1, col_start + 1], [row_start - 1, col_start], [0, 7]],


]
let Shape1 = randomShape()
// function to return random shapes
function randomShape() {

    let index = randomIndex()
    let newArr = []
    for (let i = 0; i < shapes[index].length; i++)
        newArr.push([shapes[index][i][0], shapes[index][i][1]])

    return newArr

}

// function to return random index
function randomIndex() {
    let index = Math.floor(Math.random() * shapes.length)

    return index
}

function renderAfter1sec() {


    let gameover1 = false
    for (let i = 0; i < Shape1.length - 1; i++) {
        if (Shape1[i][0] < 1 || Shape1[i][1] < 1)
            gameover1 = true
    }
    for (let r = 1; r <= 20; r++) {
        if (filledArray[r].slice(1).every((ele) => ele == 1)) {
            console.log(filledArray)
            score += 1
            scoreElement.innerText = `SCORE : ${score}`
            for (let R = r; R > 1; R--) {
                for (let c = 1; c <= 15; c++) {
                    let eleUpper = document.getElementById(String(R - 1) + "_" + String(c))

                    let currEle = document.getElementById(String(R) + "_" + String(c))
                    filledArray[R][c] = filledArray[R - 1][c]
                    currEle.style.display = eleUpper.style.display
                    currEle.style.backgroundColor = eleUpper.style.backgroundColor
                }
            }
            for (let c = 1; c <= 15; c++) {

                let currEle = document.getElementById(String(1) + "_" + String(c))
                currEle.style.display = "none"
                currEle.style.backgroundColor = "steelblue"
                filledArray[1][c] = 0
            }
        }

    }


    for (let i = 0; i < Shape1.length - 1; i++) {

        //check for bottom
        if (Shape1[i][0] >= 20) {

            for (let i = 0; i < Shape1.length - 1; i++) {

                {

                    filledArray[Shape1[i][0]][Shape1[i][1]] = 1

                    let currEle = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
                    if (currEle)
                        currEle.style.backgroundColor = "grey"

                }
            }

            Shape1 = randomShape()

            console.log("return 109")
            console.log(Shape1)
            return
        }

        //check if any block in bottom
        let r = Shape1[i][0] + 1
        let c = Shape1[i][1]


        if (r >= 1 && c >= 1 && r <= 20 && c <= 15 && filledArray[r][c] == 1) {


            for (let j = 0; j < Shape1.length - 1; j++) {
                try { filledArray[Shape1[j][0]][Shape1[j][1]] = 1 }
                catch { }

                let currEle = document.getElementById(String(Shape1[j][0]) + "_" + String(Shape1[j][1]))
                if (currEle)
                    currEle.style.backgroundColor = "grey"

            }

            if (gameover1) {


                clearInterval(timer)
                alert("Game over. " + `Your Score is ${score}`)

                location.reload()


            }




            Shape1 = randomShape()

            console.log("return 146")
            return
        }




    }


    // none display for prev state
    for (let i = 0; i < Shape1.length - 1; i++) {


        let ele = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
        if (ele)
            ele.style.display = "none"



    }


    // block display for current state
    for (let i = 0; i < Shape1.length - 1; i++) {

        Shape1[i][0] = Shape1[i][0] + 1

        let ele = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
        if (ele)
            ele.style.display = "block"

    }

}

// function to render boxes with display none
function renderBoxes() {
    let game_box = document.getElementById("game-box")
    for (let r = 1; r <= 20; r++) {
        for (let c = 1; c <= 15; c++) {
            let ele = document.createElement("div")
            ele.style.backgroundColor = "steelblue"
            ele.style.gridColumn = c
            ele.style.gridRow = r
            ele.style.display = "none"
            ele.classList.add("box")
            ele.setAttribute("id", String(r) + "_" + String(c))
            game_box.appendChild(ele)
        }
    }
}
// main function
function onArrowKeyPress(event) {
    console.log(event.target)
    if (!gamestarted)
        return
    // clockwise rotation
    if (event.code == "Space" || event.target.id == "rotate" || event.target.id == "im") {

        let currshapeNo = Shape1[Shape1.length - 1][1]
        let currdir = Shape1[Shape1.length - 1][0]
        let currRowStart = Shape1[0][0]
        let currColStart = Shape1[0][1]
        console.log(currshapeNo)
        let newShape1 = []
        if (currshapeNo == 1) {
            if (currdir == 0) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart, currColStart + 2],
                [currRowStart + 1, currColStart + 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 1) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 2, currColStart],
                [currRowStart + 1, currColStart - 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart, currColStart + 2],
                [currRowStart - 1, currColStart + 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 2, currColStart],
                [currRowStart + 1, currColStart + 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
        }
        if (currshapeNo == 6) {
            if (currdir == 0) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart - 1, currColStart],
                [currRowStart - 1, currColStart + 1],
                [currRowStart - 1, currColStart + 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 1) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart + 1, currColStart + 1],
                [currRowStart + 2, currColStart + 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 1, currColStart - 1],
                [currRowStart + 1, currColStart - 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart - 1],
                [currRowStart - 1, currColStart - 1],
                [currRowStart - 2, currColStart - 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
        }
        if (currshapeNo == 7) {
            if (currdir == 0) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart - 1, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart, currColStart + 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 1) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart - 1],
                [currRowStart + 1, currColStart - 1],
                [currRowStart + 2, currColStart - 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else if (currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart, currColStart + 2],
                [currRowStart + 1, currColStart + 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 2, currColStart],
                [currRowStart + 2, currColStart - 1],
                [(currdir + 1) % 4, currshapeNo]]
            }
        }
        if (currshapeNo == 4) {
            if (currdir == 0 || currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart - 1, currColStart + 1],
                [currRowStart - 1, currColStart + 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 1, currColStart + 1],
                [currRowStart + 2, currColStart + 1],
                [(currdir + 1) % 4, currshapeNo]]
            }

        }
        if (currshapeNo == 5) {
            if (currdir == 0 || currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart + 1, currColStart + 1],
                [currRowStart + 1, currColStart + 2],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 1, currColStart - 1],
                [currRowStart + 2, currColStart - 1],
                [(currdir + 1) % 4, currshapeNo]]
            }

        }
        if (currshapeNo == 3)
            return
        if (currshapeNo == 2) {
            if (currdir == 0 || currdir == 2) {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart, currColStart + 1],
                [currRowStart, currColStart + 2],
                [currRowStart, currColStart + 3],
                [(currdir + 1) % 4, currshapeNo]]
            }
            else {
                newShape1 = [[currRowStart, currColStart],
                [currRowStart + 1, currColStart],
                [currRowStart + 2, currColStart],
                [currRowStart + 3, currColStart],
                [(currdir + 1) % 4, currshapeNo]]
            }

        }

        for (let i = 0; i < newShape1.length - 1; i++) {
            let r = newShape1[i][0]
            let c = newShape1[i][1]
            if (r < 1 || c < 1 || r > 20 || c > 15 || filledArray[r][c] == 1) {

                return
            }


        }
        for (let i = 1; i < newShape1.length - 1; i++) {
            let ele = document.getElementById(String(newShape1[i][0]) + "_" + String(newShape1[i][1]))
            if (ele)
                ele.style.display = "block"
            ele = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
            ele.style.display = "none"


        }
        Shape1 = newShape1
        return
    }


    // for (let i = 0; i < Shape1.length-1; i++) {
    //     if (Shape1[i][0] < 1 || Shape1[i][1] < 1) {

    //         return
    //     }
    // }
    let dx = 0
    let dy = 0
    switch (event.key) {
        case "ArrowRight":
            dx = 1
            break
        case "ArrowLeft":
            dx = -1
            break

    }
    switch (event.target.id) {
        case "right":
            dx = 1
            break
        case "left":
            dx = -1
            break

    }



    if (dx == 0 && dy == 0) {

        return
    }

    for (let i = 0; i < Shape1.length - 1; i++) {

        if (Shape1[i][1] + dx < 1 || Shape1[i][1] + dx > 15) {

            return
        }
        let r = Shape1[i][0]
        let c = Shape1[i][1] + dx
        if (r >= 1 && c >= 1 && r <= 20 && c <= 15 && filledArray[r][c] == 1) {

            return
        }

    }

    for (let i = 0; i < Shape1.length - 1; i++) {
        let ele = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
        if (ele)
            ele.style.display = "none"
    }




    for (let i = 0; i < Shape1.length - 1; i++) {

        Shape1[i][1] = Shape1[i][1] + dx
        let ele = document.getElementById(String(Shape1[i][0]) + "_" + String(Shape1[i][1]))
        if (ele)
            ele.style.display = "block"


    }



}
function main() {

    renderBoxes()

    // start button
    let button = document.getElementById("but")

    // start func

    function startGame() {
        if (document.getElementById("radio1").checked)
            speed = 450
        else if (document.getElementById("radio2").checked)
            speed = 300
        else
            speed = 150
        console.log(speed)
        gamestarted = true
        // set interval 
        timer = setInterval(renderAfter1sec, speed)
        button.removeEventListener("click", startGame)
    }
    buttonEvent = button.addEventListener("click", startGame)


    // add event listener to window - for keyleft and keyright
    window.addEventListener("keydown", (event) => {
        onArrowKeyPress(event)
    })
    document.getElementById("left").addEventListener("click", (event) => {
        onArrowKeyPress(event)
    })
    document.getElementById("right").addEventListener("click", (event) => {
        onArrowKeyPress(event)
    })
    document.getElementById("rotate").addEventListener("click", (event) => {
        onArrowKeyPress(event)
    })
    document.getElementById("but1").addEventListener("click", () => {
        document.getElementById("instructions").style.display = "block"
    })
    document.getElementById("cross").addEventListener("click", () => {
        document.getElementById("instructions").style.display = "none"
    })
}


document.addEventListener("DOMContentLoaded", main)