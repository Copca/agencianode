import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
	// Consulta multiple a la BD
	const promiseDB = [];

	promiseDB.push(Viaje.findAll({ limit: 3 }));
	promiseDB.push(Testimonial.findAll({ limit: 3 }));

	try {
		// Consultar 3 viajes del modelo viaje
		const [viajes, testimoniales] = await Promise.all(promiseDB);

		res.render('inicio', {
			pagina: 'Inicio',
			clase: 'home',
			viajes,
			testimoniales
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaNosotros = (req, res) => {
	res.render('nosotros', {
		pagina: 'Nosotros'
	});
};

const paginaViajes = async (req, res) => {
	// Consultar BD
	const viajes = await Viaje.findAll();

	res.render('viajes', {
		pagina: 'Próximos Viajes',
		viajes
	});
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
	const { slug } = req.params;

	try {
		const viaje = await Viaje.findOne({ where: { slug } });

		res.render('viaje', {
			pagina: 'Información Viaje',
			viaje
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaTestimoniales = async (req, res) => {
	try {
		const testimoniales = await Testimonial.findAll();

		res.render('testimoniales', {
			pagina: 'Testimoniales',
			testimoniales
		});
	} catch (error) {
		console.log(error);
	}
};

export {
	paginaInicio,
	paginaNosotros,
	paginaViajes,
	paginaTestimoniales,
	paginaDetalleViaje
};
