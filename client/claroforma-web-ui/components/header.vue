<template>
    <div class="ui fixed inverted menu">
        <div class="ui container">
          <a href="#" class="header item">
            Project
          </a>
          <a href="#" class="item">Home</a>
          <div class="ui simple dropdown item">
            Dropdown <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item" href="#">Link Item</a>
              <a class="item" href="#">Link Item</a>
              <div class="divider"></div>
              <div class="header">Header Item</div>
              <div class="item">
                <i class="dropdown icon"></i>
                Sub Menu
                <div class="menu">
                  <a class="item" href="#">Link Item</a>
                  <a class="item" href="#">Link Item</a>
                </div>
              </div>
              <a class="item" href="#">Link Item</a>
            </div>
          </div>
        </div>
      </div>

</template>

<style>
body {
  background-color: #FFFFFF;
}
.ui.menu .item img.logo {
  margin-right: 1.5em;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
</style>
