<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-tabs grow>
      <v-tab>פרטים אישיים</v-tab>
      <v-tab>הספרים שלי</v-tab>
      <v-tab>מועדפים</v-tab>
    </v-tabs>

    <router-view></router-view>
  </v-sheet>
</template>
