<script setup lang="ts">

</script>

<template>
  <div :class="$style.subscription">
    <div :class="$style.subscribe">Subscribe</div>
    <div :class="$style.form">
      <div :class="$style.row">
        <div :class="$style.input">
        <div :class="$style.firstName">First name</div>
        <div :class="$style.field">
          <div :class="$style.label">Jane</div>
        </div>
      </div>

      <div :class="$style.input1">
        <div :class="$style.firstName">Last name</div>
        <div :class="$style.field">
          <div :class="$style.label">Smitherton</div>
        </div>
      </div>
      </div>
      <div :class="$style.row">

      <div :class="$style.input2">
        <div :class="$style.firstName">Email address</div>
        <div :class="$style.field">
          <div :class="$style.label">email@janesfakedomain.net</div>
        </div>
      </div>
      </div>
      <div :class="$style.row">

      <div :class="$style.input3">
        <div :class="$style.firstName">Your message</div>
        <div :class="$style.field">
          <div :class="$style.label">Enter your question or message</div>
        </div>
      </div>
      </div>
      <div :class="$style.button">
        <div :class="$style.submit">Submit</div>
      </div>
    </div>
  </div>
</template>
<style  module>.subscribe {
  align-self: stretch;
  position: relative;
  line-height: 120%;
  font-weight: 600;
}
.firstName {
  align-self: stretch;
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.label {
  flex: 1;
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.field {
  align-self: stretch;
  flex: 1;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 16px;
  color: #7ec8e3;
}
.input {
  width: 50%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input1 {
  width: 50%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input2 {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input3 {
  width: 100%;
  height: 194px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.submit {
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.button {
  flex: 1;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #0077b6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 20px;
  color: #7ec8e3;
}
.form {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 24px 32px;
  font-size: 16px;
}
.subscription {
  max-width: 50vw;
  margin-left: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 70px 99px 70px 106px;
  box-sizing: border-box;
  gap: 58px;
  text-align: left;
  font-size: 40px;
  color: #1f3a5f;
  font-family: Inter;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}

</style>