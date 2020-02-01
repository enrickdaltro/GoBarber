import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';

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

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res.status(401).json({ error: 'Past Date Not Permited ' });
        }

        const checkAvailability = await Appointment.findOne({
            where: { provider_id, canceled_at: null, date: hourStart }
        });

        if (checkAvailability) {
            return res.status(401).json({ error: 'Date is not available' });
        }

        const appointment = await Appointment.create({
            user_id: req.UserId,
            provider_id,
            date: hourStart
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
