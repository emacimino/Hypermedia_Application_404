<template>
  <div :class="$style.about">
    <div :class="$style.copy">
      <b :class="$style.yogaCourse">🌿 Yoga Course </b>
      <div :class="$style.subheadingForDescription">Subheading for description or instructions</div>
      <div :class="$style.paragraph">
        <p :class="$style.discoverBalanceStrength">Discover balance, strength, and inner peace with our guided yoga course, open to all levels — from complete beginners to experienced practitioners. At [Yoga Center Name], we offer a welcoming space where you can deepen your practice, reconnect with your body, and find calm in the midst of daily life.</p>
        <p :class="$style.discoverBalanceStrength">Led by certified instructors, each class combines mindful movement, breathwork, and relaxation techniques to improve flexibility, reduce stress, and enhance overall well-being. Whether you're looking to build a steady routine or simply explore the benefits of yoga, our course provides a supportive and inspiring environment for your journey.</p>
        <p :class="$style.discoverBalanceStrength">Join us to move, breathe, and grow — both on and off the mat.</p>
        <p :class="$style.discoverBalanceStrength">🧘‍♀️ Weekly sessions | Small class sizes | All equipment provided</p>
      </div>
    </div>
    <img :class="$style.image7Icon" alt="" src="image 7.png" />
    <div :class="$style.form">
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
      <div :class="$style.input2">
        <div :class="$style.firstName">Email address</div>
        <div :class="$style.field">
          <div :class="$style.label">email@janesfakedomain.net</div>
        </div>
      </div>
      <div :class="$style.input3">
        <div :class="$style.firstName">Your message</div>
        <div :class="$style.field">
          <div :class="$style.label">Enter your question or message</div>
        </div>
      </div>
      <div :class="$style.button">
        <div :class="$style.submit">Submit</div>
      </div>
    </div>
    <div :class="$style.subscribe">Subscribe</div>
  </div>
</template>
<style  module>.yogaCourse {
  align-self: stretch;
  position: relative;
  letter-spacing: -0.02em;
}
.subheadingForDescription {
  align-self: stretch;
  position: relative;
  font-size: 24px;
  line-height: 150%;
}
.discoverBalanceStrength {
  margin: 0;
}
.paragraph {
  align-self: stretch;
  position: relative;
  font-size: 20px;
  line-height: 150%;
  font-weight: 500;
}
.copy {
  position: absolute;
  top: 134px;
  left: 185px;
  width: 624px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
}
.image7Icon {
  position: absolute;
  top: 139px;
  left: 989px;
  width: 845px;
  height: 845px;
  object-fit: cover;
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
  width: 295px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input1 {
  width: 297px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input2 {
  width: 626px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input3 {
  width: 626px;
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
  position: absolute;
  width: 32.6%;
  top: 1122px;
  right: 15.89%;
  left: 51.51%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 24px 32px;
  font-size: 16px;
}
.subscribe {
  position: absolute;
  top: 1048px;
  left: 989px;
  font-size: 40px;
  line-height: 120%;
  font-weight: 600;
  display: inline-block;
  width: 516px;
}
.about {
  width: 100%;
  position: relative;
  height: 2086px;
  overflow: hidden;
  text-align: left;
  font-size: 64px;
  color: #1f3a5f;
  font-family: Inter;
}

</style>