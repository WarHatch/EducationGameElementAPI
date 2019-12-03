import { Request, Response } from 'express';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '0byunyul',
  dataset: 'production',
  // token: 'sanity-auth-token', // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})

const fetchALLCMSData = async() => {
  return client.fetch('*[]');
}

export default {
  fetchALLCMSData,
}