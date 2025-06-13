import { Router } from 'express';
import { authRouter } from './routers/auth.router';
import { chatRouter } from './routers/chat.router';

export const appRouter = Router();

appRouter.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

appRouter.use('/auth', authRouter);
appRouter.use('/chat', chatRouter);

appRouter.get('/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Adidas Football',
      price: 23.75,
      imageUrl: '/images/adidas_predator.png'
    },
    {
      id: 2,
      name: 'Nike Phantom Elite',
      price: 45.00,
      imageUrl: '/images/nike_phantom_elite.png'
    },
    {
      id: 3,
      name: 'Puma Ultra',
      price: 39.99,
      imageUrl: '/images/puma_ultra.png'
    },
    {
      id: 4,
      name: 'Adidas X Speedflow',
      price: 29.99,
      imageUrl: '/images/adidas_x_speedflow.png'
    },
    {
      id: 5,
      name: 'Nike Tiempo Legend',
      price: 34.99,
      imageUrl: '/images/nike_tiempo_legend.png'
    },
    {
      id: 6,
      name: 'Puma Future',
      price: 27.99,
      imageUrl: '/images/puma_future.png'
    },
    {
      id: 7,
      name: 'Adidas Predator 2',
      price: 28.50,
      imageUrl: '/images/adidas_predator.png'
    },
    {
      id: 8,
      name: 'Nike Phantom Elite 2',
      price: 47.00,
      imageUrl: '/images/nike_phantom_elite.png'
    },
    {
      id: 9,
      name: 'Puma Ultra 2',
      price: 41.99,
      imageUrl: '/images/puma_ultra.png'
    },
    {
      id: 10,
      name: 'Adidas X Speedflow 2',
      price: 31.99,
      imageUrl: '/images/adidas_x_speedflow.png'
    },
    {
      id: 11,
      name: 'Nike Tiempo Legend 2',
      price: 36.99,
      imageUrl: '/images/nike_tiempo_legend.png'
    },
    {
      id: 12,
      name: 'Puma Future 2',
      price: 29.99,
      imageUrl: '/images/puma_future.png'
    }
  ]);
});
