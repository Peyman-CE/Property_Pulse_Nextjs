'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values for amenities and images
  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').filter((image) => image.name !== '');

  // Create the propertyData object with embedded seller_info
  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'), // fixed trailing dot
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  // Upload all images in parallel
  const uploadPromises = images.map(async (imageFile) => {
    // Convert file to base64 string
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    // Use the file's actual MIME type (e.g., image/jpeg)
    const dataUri = `data:${imageFile.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'propertypulse',
    });
    return result.secure_url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;