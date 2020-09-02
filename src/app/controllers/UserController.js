import User from '../models/User';

class UserController {
  async store(request, response) {
    const { email } = request.body;

    if (await User.findOne({ where: { email } })) {
      return response.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create(request.body);
    return response.status(201).json(user);
  }
}

export default new UserController();
