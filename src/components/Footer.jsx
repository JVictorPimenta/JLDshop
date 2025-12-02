import React from 'react'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

export default function Footer() {
  return (
    <footer className="mt-auto surface-0 border-top-1 surface-border">
      <div className="px-4 py-6">
        <div className="grid">
          {/* Main Footer Content */}
          <div className="col-12 md:col-6 flex flex-column align-items-center md:align-items-start gap-3">
            <div className="text-center md:text-left">
              <span className="text-xl font-bold text-amber-600">JDLShop</span>
              <p className="text-gray-600 mt-2">Sua loja online de confiança</p>
            </div>
            
            <div className="flex align-items-center gap-3">
              <a href="#" className="no-underline">
                <i className="pi pi-facebook text-gray-500 hover:text-amber-600 text-xl transition-colors transition-duration-150"></i>
              </a>
              <a href="#" className="no-underline">
                <i className="pi pi-instagram text-gray-500 hover:text-amber-600 text-xl transition-colors transition-duration-150"></i>
              </a>
              <a href="#" className="no-underline">
                <i className="pi pi-twitter text-gray-500 hover:text-amber-600 text-xl transition-colors transition-duration-150"></i>
              </a>
            </div>
          </div>

          <div className="col-12 md:col-6 flex flex-column align-items-center md:align-items-end gap-3">
            <div className="text-center md:text-right">
              <h4 className="font-bold mb-2 text-gray-800">Links Rápidos</h4>
              <div className="flex flex-column gap-2">
                <a href="#" className="text-gray-600 hover:text-amber-600 no-underline transition-colors transition-duration-150">
                  Sobre Nós
                </a>
                <a href="#" className="text-gray-600 hover:text-amber-600 no-underline transition-colors transition-duration-150">
                  Termos de Serviço
                </a>
                <a href="#" className="text-gray-600 hover:text-amber-600 no-underline transition-colors transition-duration-150">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-4" />

        {/* Bottom Section */}
        <div className="flex flex-column md:flex-row align-items-center justify-content-between gap-3">
          <div className="text-center md:text-left">
            <span className="text-gray-500 text-sm">
              <i className="pi pi-info-circle mr-2"></i>
              Protótipo MVP :D
            </span>
          </div>
          
          <div className="flex align-items-center gap-3">
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button 
                label="Nosso Contato" 
                icon="pi pi-envelope" 
                className="p-button-outlined p-button-sm"
              />
            </a>
            
            <Button 
              label="Voltar ao Topo" 
              icon="pi pi-arrow-up" 
              className="p-button-text p-button-sm" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-gray-400 text-xs">
            © {new Date().getFullYear()} JDLShop. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}