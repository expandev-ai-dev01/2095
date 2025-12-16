/**
 * ContactInfo Component
 * Displays alternative contact information (phone, WhatsApp, address)
 */

import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { ContactInfoProps } from './types';

function ContactInfo({ className }: ContactInfoProps) {
  const phoneNumber = '11999999999';
  const displayPhone = '(11) 99999-9999';
  const address = 'Rua Exemplo, 123 - Bairro - São Paulo/SP';
  const whatsappUrl = `https://wa.me/55${phoneNumber}`;

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      role="region"
      aria-label="Informações de contato alternativas"
    >
      <div>
        <h3 className="mb-4 text-xl font-semibold">Outras formas de contato</h3>
        <p className="text-muted-foreground text-sm">
          Você também pode entrar em contato conosco através dos canais abaixo:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary size-10 flex shrink-0 items-center justify-center rounded-md">
            <Phone className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Telefone</p>
            <a
              href={`tel:+55${phoneNumber}`}
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {displayPhone}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary size-10 flex shrink-0 items-center justify-center rounded-md">
            <MessageCircle className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">WhatsApp</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {displayPhone}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary size-10 flex shrink-0 items-center justify-center rounded-md">
            <MapPin className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Endereço</p>
            <p className="text-muted-foreground text-sm">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContactInfo };
