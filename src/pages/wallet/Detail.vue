<template>
  <div class="detail">
    <ul class="trade">
      <li class="trade-list c-flex">
        <div class="c-flex1">
          <div>
            <span>提现</span>
            <span class="state wait"></span>
          </div>
          <div>2018-3-28 12:00:00</div>
        </div>
        <div class="c-flex1">
          200.00元
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.detail{
  background-color: #fff;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.detail .trade-list{
  padding: 15px 25px 10px; /*no*/
  border-bottom: 1px solid gray; /*no*/
}
.detail .trade-list > div{
  display: flex;
  flex-direction: column;
}
.detail .trade-list > div:last-child{
  color: orangered;
  font-size: 1.2em;
}
.detail .trade-list > div > div:first-child{
  margin-bottom: 5px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
}
.detail .trade-list > div > div:first-child span{
  margin-right: 50px;
}
.detail .trade-list > div > div:last-child{
  color: rgb(170,170,170);
}
.detail .trade-list div:last-child{
  align-items: flex-end;
  justify-content: center;
}
.detail .trade-list .state{
  background-size: 100%;
  display: inline-block;
}
[data-dpr="1"] .detail .trade-list .wait{
  width: 84px;
  height: 24px;
  background-image: url(../../assets/images/wallet/wait@2x.png);
}
[data-dpr="2"] .detail .trade-list .wait{
  width: 168px;
  height: 48px;
  background-image: url(../../assets/images/wallet/wait@2x.png)
}
[data-dpr="3"] .detail .trade-list .wait{
  width: 252px;
  height: 72px;
  background-image: url(../../assets/images/wallet/complete@3x.png)
}
[data-dpr="1"] .detail .trade-list .complete{
  width: 84px;
  height: 24px;
  background-image: url(../../assets/images/wallet/complete@2x.png);
}
[data-dpr="2"] .detail .trade-list .complete{
  width: 168px;
  height: 48px;
  background-image: url(../../assets/images/wallet/complete@2x.png)
}
[data-dpr="3"] .detail .trade-list .complete{
  width: 252px;
  height: 72px;
  background-image: url(../../assets/images/wallet/wait@3x.png)
}
</style>
