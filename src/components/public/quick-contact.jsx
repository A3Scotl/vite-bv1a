import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import {  Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
function QuickContact() {
  return (
    <div>
         {/* Quick Contact */}
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Cần tư vấn?
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Liên hệ với chúng tôi để được hỗ trợ tốt nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/lien-he">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Liên hệ ngay
                  </Button>
                </Link>
                <Link to="/dat-lich-kham">
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Đặt lịch khám
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
    </div>
  )
}

export default QuickContact
