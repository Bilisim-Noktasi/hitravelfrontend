import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DependencyLayout from "../dependency";
import DefaultLayout from "@/components/admin/Layout";
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '@/app/[locale]/admin/globals.css'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <DependencyLayout>
        <PrimeReactProvider>
        <DefaultLayout children={children} />
        </PrimeReactProvider>
      </DependencyLayout>
    </NextIntlClientProvider>
  );
}
