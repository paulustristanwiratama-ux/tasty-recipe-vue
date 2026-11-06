<template>
  <div class="header__search flex-grow-1" style="max-width: 320px">
    <div class="d-none d-sm-block">
      <div
        class="header__searchbar input-group align-items-center border rounded-pill"
      >
        <span class="px-2"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input
          type="text"
          class="form-control form-control-sm border-0 rounded-pill"
          placeholder="Search Recipe"
        />
      </div>
    </div>
    <div class="d-flex d-sm-none justify-content-center border-end px-3">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>
