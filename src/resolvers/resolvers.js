const { db } = require('../db/database')

const resolversCovid = {

    Query: {
        provincia(root, { id }) {
            if (id == undefined) {
                return queryDB("select * from provincia").then(data => data);
            }
            return queryDB("select * from provincia where id=?", id).then(data => data);
        },
        casoscovid(root, { id }) {
            if (id == undefined) {
                return queryDB("select * from casos_covid").then(data => data);
            }
            return queryDB("select * from casos_covid where id=?", id).then(data => data);
        },
        info_covid(root, { id }) {
            if (id == undefined) {
                return queryDB("select * from info_covid19").then(data => data);
            }
            return queryDB("select * from info_covid19 where id=?", id).then(data => data);
        },
    },
    Provincia: {
        casos(provParam) {

            let res = queryDB("SELECT casos_covid.* from info_covid19,casos_covid WHERE info_covid19.id_caso=casos_covid.id and info_covid19.id_prov=?", provParam.id).then(data => data);
            return res;
        }
    },
    Mutation: {
        async createProv(root, { provincia }) {
            if (provincia === undefined) return null;
            let res = await queryDB("insert into provincia SET ?;", provincia).then(data => data);
            return res;
        },
        updateProvInfo: (root, { provincia }) => queryDB("update provincia SET ? where id = ?", [provincia, provincia.id]).then(data => data),
        deleteProv: (root, { id }) => queryDB("delete from provincia where id = ?", id).then(data => data)
    }
}


async function queryDB(sql, args) {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
        });
    });
}

//exports.resolvers = resolversCovid;
module.exports = {
    ...resolversCovid
}