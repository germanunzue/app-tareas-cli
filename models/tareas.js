/**
 * _listado:
 *          { uuid-453522-234234-2} : {id:12, desc:sgsvbsavs,. compleatdoEN: 223}
 */
const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado;
    }


    constructor() {
        this._listado = {};
    }


    cargarTareasFromArray(tareas = []) {
        const listado = [];

        tareas.forEach(item => {
            this._listado[item.id] = item;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {
        console.log('');
        Object.keys(this._listado).forEach((id, index) => {
            const idx = `${index+1}`.green;
            const desc = `${this._listado[id].desc}`;
            const estado = `${this._listado[id].completadoEn ? 'Completado'.green : 'Pendiente'.red}`
            const result = `${idx}. ${desc} :: ${estado}`;
            console.log(result);
        })
    }

    listarPendientesCompletadas(completadas = true) {

        console.log('');
        let index = 0;
        this.listadoArr.forEach((tarea) => {

            const desc = `${tarea.desc}`;
            const estado = `${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red}`

            if (completadas && tarea.completadoEn) {
                index++;
                const idx = `${index}`.green;
                const result = `${idx}. ${desc} :: ${tarea.completadoEn.green}`;
                console.log(result);
            } else if (!completadas && !tarea.completadoEn) {
                index++;
                const idx = `${index}`.green;
                const result = `${idx}. ${desc} :: ${estado}`;
                console.log(result);
            }
        })

    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toogleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                const vtarea = this._listado[tarea.id];
                vtarea.completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;