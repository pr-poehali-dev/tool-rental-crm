import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Tool {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'available' | 'rented' | 'maintenance';
  image: string;
}

interface Booking {
  id: number;
  toolName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'upcoming';
  price: number;
}

interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: Date;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedDates, setSelectedDates] = useState<Date | undefined>();
  const [activeTab, setActiveTab] = useState('catalog');

  const tools: Tool[] = [
    { id: 1, name: 'Перфоратор Bosch GBH 2-28', category: 'Электроинструмент', price: 500, status: 'available', image: '🔨' },
    { id: 2, name: 'Болгарка Makita GA9020', category: 'Электроинструмент', price: 400, status: 'available', image: '⚙️' },
    { id: 3, name: 'Бетономешалка 180л', category: 'Строительное', price: 800, status: 'rented', image: '🏗️' },
    { id: 4, name: 'Генератор 5кВт', category: 'Энергооборудование', price: 1200, status: 'available', image: '⚡' },
    { id: 5, name: 'Лестница 6м', category: 'Оснастка', price: 300, status: 'available', image: '🪜' },
    { id: 6, name: 'Шуруповёрт DeWalt', category: 'Электроинструмент', price: 350, status: 'available', image: '🔧' },
    { id: 7, name: 'Компрессор 50л', category: 'Энергооборудование', price: 600, status: 'maintenance', image: '💨' },
    { id: 8, name: 'Рубанок электрический', category: 'Электроинструмент', price: 450, status: 'available', image: '🪚' },
  ];

  const bookings: Booking[] = [
    { id: 1, toolName: 'Перфоратор Bosch GBH 2-28', startDate: new Date(2026, 0, 10), endDate: new Date(2026, 0, 17), status: 'active', price: 3500 },
    { id: 2, toolName: 'Болгарка Makita GA9020', startDate: new Date(2026, 0, 20), endDate: new Date(2026, 0, 25), status: 'upcoming', price: 2000 },
    { id: 3, toolName: 'Генератор 5кВт', startDate: new Date(2025, 11, 15), endDate: new Date(2025, 11, 22), status: 'completed', price: 8400 },
  ];

  const payments: Payment[] = [
    { id: 1, bookingId: 1, amount: 3500, status: 'paid', date: new Date(2026, 0, 10) },
    { id: 2, bookingId: 2, amount: 2000, status: 'pending', date: new Date(2026, 0, 20) },
    { id: 3, bookingId: 3, amount: 8400, status: 'paid', date: new Date(2025, 11, 15) },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category)))];

  const handleBooking = (tool: Tool) => {
    if (!selectedDates) {
      toast.error('Выберите даты аренды');
      return;
    }
    toast.success(`${tool.name} забронирован!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                ToolRent Pro
              </h1>
              <p className="text-muted-foreground text-lg">Профессиональная аренда инструмента</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="gap-2">
                <Icon name="Bell" size={20} />
                Уведомления
              </Button>
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="User" size={20} />
                Профиль
              </Button>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto h-14 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="catalog" className="gap-2 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <Icon name="Wrench" size={18} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <Icon name="Calendar" size={18} />
              Мои аренды
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <Icon name="CreditCard" size={18} />
              Платежи
            </TabsTrigger>
            <TabsTrigger value="booking" className="gap-2 text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <Icon name="CalendarCheck" size={18} />
              Бронирование
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <Card className="border-2 shadow-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Search" size={24} />
                  Поиск и фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <Input
                    placeholder="Поиск инструмента..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 min-w-[250px] h-12 text-base"
                  />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[250px] h-12 text-base">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'Все категории' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pb-4">
                    <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">{tool.image}</div>
                    <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                    <CardDescription className="text-base">{tool.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{tool.price} ₽/день</span>
                      {tool.status === 'available' && (
                        <Badge className="bg-green-500 text-white">Доступно</Badge>
                      )}
                      {tool.status === 'rented' && (
                        <Badge className="bg-orange-500 text-white">Арендован</Badge>
                      )}
                      {tool.status === 'maintenance' && (
                        <Badge variant="secondary">На ТО</Badge>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      disabled={tool.status !== 'available'}
                      onClick={() => handleBooking(tool)}
                    >
                      {tool.status === 'available' ? 'Забронировать' : 'Недоступно'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{booking.toolName}</CardTitle>
                      {booking.status === 'active' && (
                        <Badge className="bg-green-500 text-white text-base px-3 py-1">Активна</Badge>
                      )}
                      {booking.status === 'upcoming' && (
                        <Badge className="bg-blue-500 text-white text-base px-3 py-1">Предстоящая</Badge>
                      )}
                      {booking.status === 'completed' && (
                        <Badge variant="secondary" className="text-base px-3 py-1">Завершена</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Начало аренды</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="CalendarDays" size={16} />
                          {booking.startDate.toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Окончание</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="CalendarCheck" size={16} />
                          {booking.endDate.toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Стоимость</p>
                        <p className="font-bold text-primary text-lg">{booking.price} ₽</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">ID заказа</p>
                        <p className="font-mono text-sm">#{booking.id.toString().padStart(6, '0')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Wallet" size={24} />
                  История платежей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div 
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          payment.status === 'paid' ? 'bg-green-100' : payment.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <Icon 
                            name={payment.status === 'paid' ? 'CheckCircle' : payment.status === 'pending' ? 'Clock' : 'AlertCircle'} 
                            size={24}
                            className={
                              payment.status === 'paid' ? 'text-green-600' : payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                            }
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Заказ #{payment.bookingId.toString().padStart(6, '0')}</p>
                          <p className="text-sm text-muted-foreground">{payment.date.toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">{payment.amount} ₽</p>
                        {payment.status === 'paid' && (
                          <Badge className="bg-green-500 text-white mt-1">Оплачено</Badge>
                        )}
                        {payment.status === 'pending' && (
                          <Badge className="bg-yellow-500 text-white mt-1">Ожидание</Badge>
                        )}
                        {payment.status === 'overdue' && (
                          <Badge className="bg-red-500 text-white mt-1">Просрочено</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Calendar" size={24} />
                    Выберите даты аренды
                  </CardTitle>
                  <CardDescription className="text-base">
                    Выберите начальную дату аренды инструмента
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDates}
                    onSelect={setSelectedDates}
                    className="rounded-lg border-2 shadow-sm"
                    disabled={(date) => date < new Date()}
                  />
                </CardContent>
              </Card>

              <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Info" size={24} />
                    Информация о бронировании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDates ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Выбранная дата</p>
                        <p className="text-2xl font-bold text-primary">{selectedDates.toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-500 mt-1" />
                          <p className="text-sm">Бронирование без предоплаты</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-500 mt-1" />
                          <p className="text-sm">Возможность продления аренды</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-500 mt-1" />
                          <p className="text-sm">Бесплатная доставка при аренде от 3 дней</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-500 mt-1" />
                          <p className="text-sm">Техподдержка 24/7</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full h-12 text-base bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90"
                        onClick={() => {
                          toast.success('Перейдите в каталог и выберите инструмент');
                          setActiveTab('catalog');
                        }}
                      >
                        Выбрать инструмент
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="CalendarDays" size={48} className="mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">Выберите дату начала аренды для продолжения</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
