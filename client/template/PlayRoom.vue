<template>
  <div>
      <div class="box">
        <div class="sbox1">
            <div class="timerBox">
                <p>12</p>
            </div>
            <div class="tbox">
                <span class="question">Maluku</span>
            </div>
        </div>
        <div class="sbox2">
            <div class="score">
                <p>
                    player1: 0
                    <br>
                    player2: 0
                    <br>
                    player3: 0
                    <br>
                    player4: 10
                    <br>
                </p>
            </div>

            <div class="chat">
                <p>
                    <span class="text-muted"> <i>player1 joined the game!</i> <br> </span>
                    <span class="text-muted"> <i>player2 joined the game!</i> <br> </span>
                    <span class="text-muted"> <i>player3 joined the game!</i> <br> </span>
                    <span class="text-muted"> <i>player4 joined the game!</i> <br> </span>
                    player1: Malulu <br>
                    player2: test <br>
                    player3: Malukk <br>
                    player4: Maluku <br>
                    <span class="text-muted"> <i>player4 correct, 10 points added to the score!</i> </span>
                </p>
            </div>

            <div class="textCont">
                <input class="textInput" type="text" placeholder="     input your answer here">
            </div>

            <div class="buttonContainer">
                <button type="button" class="button btn btn-success">START</button>
                <button type="button" class="button btn btn-danger">LEAVE</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>