<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-data-table
                :loading="loading"
                :headers="table.headers"
                :items="table.data"
                :footer-props="{
                    itemsPerPageText: table.rowsPerPageText
                }"
            >
                <template v-slot:item.project_type="{ item }">
                    {{ item.getFmtType() }}
                </template>
                <template v-slot:item.authors="{ item }">
                    <v-chip
                        class="ml-1"
                        label
                        v-for="(author, i) in item.authors"
                        :key="i"
                        >{{ author.first_name }} {{ author.last_name }}</v-chip
                    >
                </template>
                <template v-slot:item.guides="{ item }">
                    <v-chip
                        :key="i"
                        class="ml-1"
                        label
                        v-for="(guide, i) in item.guides"
                        >{{ guide.account.first_name }}
                        {{ guide.account.last_name }}</v-chip
                    >
                </template>
                <template v-slot:item._actions="{ item }">
                    <v-btn outlined color="indigo" small @click="check(item)"
                        >revisar</v-btn
                    >
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
