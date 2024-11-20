const {Estudiante, Equipo} = require('../models/modelSchemas');

const resolvers = {
    Query: {
        async getEquipos (obj) {
            const equipos = await Equipo.find();
            return equipos;
        },
        async getEquipo (obj, { id } ) {
            const equipo = await Equipo.findById(id);
            return equipo;
        }
    },
    Mutation: {
        async addEquipo(obj, { input }) {
            const equipo = new Equipo(input);
            await equipo.save();
            return equipo;
        },
        async updateEquipo(obj, { id, input }) {
            const equipo = await Equipo.findByIdAndUpdate(id, input, { new: true });
            return equipo;
        },
        async deleteEquipo(obj, { id }) {
            await Equipo.findByIdAndDelete(id);
            return { message: 'Equipo eliminado' };
        }
    }
};

module.exports = resolvers;