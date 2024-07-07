import Layout from '@/components/layout/Layout';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Root() {
return (<Layout>
  <View className='mt-9 mx-auto' >
    <Link href="/screens/coma"className='bg-blue-400 px-2 py-1 rounded-lg text-white justify-center items-center w-3/5 mt-9 px-auto text-xl my-auto'>
    Navigate to alpha route</Link>
  </View>
  </Layout>);
}
