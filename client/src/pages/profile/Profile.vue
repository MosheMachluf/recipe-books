<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-tabs grow>
      <v-tab :to="{ name: 'EditProfile' }">פרטים אישיים</v-tab>
      <v-tab :to="{ name: 'MyBooks' }">הספרים שלי</v-tab>
      <v-tab :to="{ name: 'MyFav' }">מועדפים</v-tab>
    </v-tabs>

    <router-view></router-view>
  </v-sheet>
</template>
