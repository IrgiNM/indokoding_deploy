// components/ContactUsTable.tsx
import { Contact } from '@/type/contact';

type Props = {
  contacts: Contact[];
};

const ContactUsTable = ({ contacts }: Props) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Pesan Contact Us</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left uppercase text-xs tracking-wider">
              <th className="px-6 py-3 border-b border-gray-200">No</th>
              <th className="px-6 py-3 border-b border-gray-200">Nama</th>
              <th className="px-6 py-3 border-b border-gray-200">Email</th>
              <th className="px-6 py-3 border-b border-gray-200">Pesan</th>
              <th className="px-6 py-3 border-b border-gray-200">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((contact, index) => (
              <tr key={contact.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                <td className="px-6 py-4">{contact.massage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.date && typeof contact.date === 'object' && ('_seconds' in contact.date)
                        ? new Date((contact.date as { _seconds: number })._seconds * 1000).toLocaleString('id-ID')
                        : 'Tanggal tidak tersedia'}
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUsTable;
