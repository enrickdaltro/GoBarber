import Appointment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';

class AppointmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.date().required(),
            date: Yup.date().required()
        });

        if (!schema.isValid(req.body)) {
            return res.json(400).json({ error: 'Validation Fails' });
        }

        const { provider_id, date } = req.body;

        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true }
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Providers Only' });
        }

        const appointment = await Appointment.create({
            user_id: req.UserId,
            provider_id,
            date
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
