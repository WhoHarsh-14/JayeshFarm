"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/hooks/use-cart"
import {
  Phone,
  Mail,
  MapPin,
  Leaf,
  Award,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Clock,
  Heart,
  Shield,
  Milk,
  Sun,
  Plus,
  MilkIcon as Cow,
  Tractor,
  Home,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function MildarDairyFarm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const { dispatch } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
      if (!hasStarted) return

      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [hasStarted, end, duration])

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true)
          }
        },
        { threshold: 0.5 },
      )

      const element = document.getElementById(`counter-${end}`)
      if (element) observer.observe(element)

      return () => observer.disconnect()
    }, [end])

    return (
      <span id={`counter-${end}`}>
        {count}
        {suffix}
      </span>
    )
  }

  const addToCart = (product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: Number.parseFloat(product.price.replace("$", "")),
        image: product.image,
        unit: product.unit,
      },
    })
  }

  return (
    <div className="min-h-screen bg-cream-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-green-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-3 group animate-fade-in-left">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Milk className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-gentle">
                  <Leaf className="w-1.5 h-1.5 md:w-2 md:h-2 text-green-800" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
                  Mildar Farm
                </h1>
                <p className="text-xs text-green-600 font-medium hidden sm:block">Fresh • Natural • Pure</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 animate-fade-in">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Products", href: "#products" },
                { name: "Farm Tours", href: "#tours" },
                { name: "Contact", href: "#contact" },
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 relative group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden md:flex items-center space-x-4 animate-fade-in-right">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-green-800">(555) 123-FARM</p>
                <p className="text-xs text-gray-600">Call us today!</p>
              </div>
              <CartDrawer />
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Visit Farm
              </Button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="flex items-center space-x-2 md:hidden">
              <CartDrawer />
              <button
                className="p-2 text-green-800 hover:text-green-600 transition-all duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-green-100">
              <nav className="space-y-4">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#about" },
                  { name: "Products", href: "#products" },
                  { name: "Farm Tours", href: "#tours" },
                  { name: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-green-600 font-medium py-2 transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <p className="text-sm font-semibold text-green-800">(555) 123-FARM</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300">
                    Visit Farm
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-cream-50 to-green-100 overflow-hidden"
        data-animate
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 bg-green-200/30 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 md:w-16 md:h-16 bg-green-300/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-green-400/25 rounded-full animate-float-slow"></div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4 md:space-y-6">
                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 md:px-4 py-2 text-sm font-semibold animate-bounce-gentle">
                  🌾 Family Owned Since 1952
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-green-800 inline-block animate-slide-in-left">Fresh</span>
                  <br />
                  <span className="text-green-600 inline-block animate-slide-in-right animation-delay-300">Dairy</span>
                  <br />
                  <span className="text-gray-800 inline-block animate-slide-in-left animation-delay-600">From Our</span>
                  <br />
                  <span className="text-yellow-600 inline-block animate-slide-in-right animation-delay-900">Farm</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in animation-delay-1200">
                  Experience the pure taste of nature with our premium dairy products. From our pasture to your table,
                  we ensure the highest quality and freshness.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-1500">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  Shop Products
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Take Farm Tour
                </Button>
              </div>

              {/* Farm Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
                {[
                  { icon: Users, number: 500, suffix: "+", label: "Happy Families" },
                  { icon: Milk, number: 70, suffix: "+", label: "Years Experience" },
                  { icon: Award, number: 100, suffix: "%", label: "Organic Certified" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${1800 + index * 200}ms` }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-green-800">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in-right animation-delay-300" data-animate id="hero-image">
              <div className="relative transform hover:scale-105 transition-transform duration-700">
                {/* Farm Scene with Icons */}
                <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 relative overflow-hidden">
                  {/* Sky */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-200 to-blue-300"></div>

                  {/* Hills */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-green-600 via-green-500 to-green-400"></div>

                  {/* Farm Elements */}
                  <div className="absolute bottom-16 left-8 w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                    <Home className="w-8 h-8 text-white" />
                  </div>

                  <div className="absolute bottom-8 right-12 w-12 h-12 bg-brown-600 rounded-full flex items-center justify-center">
                    <Cow className="w-6 h-6 text-white" />
                  </div>

                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Tractor className="w-5 h-5 text-white" />
                  </div>

                  {/* Sun */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-gentle">
                    <Sun className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-xl border border-green-100 animate-slide-in-up animation-delay-1000 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center animate-pulse-gentle">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">100% Natural</div>
                    <div className="text-xs md:text-sm text-gray-600">No Hormones</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-2xl shadow-xl border border-yellow-100 animate-slide-in-down animation-delay-1200 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse-gentle">
                    <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Farm Fresh</div>
                    <div className="text-xs md:text-sm text-gray-600">Daily Harvest</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-white relative overflow-hidden" data-animate>
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* About Visual */}
            <div className="relative animate-fade-in-left" data-animate id="about-images">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  {/* Cow Pasture */}
                  <div className="h-48 md:h-64 bg-gradient-to-br from-green-300 to-green-500 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent"></div>
                    <Cow className="w-16 h-16 text-white/80" />
                  </div>

                  {/* Milk Production */}
                  <div className="h-32 md:h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <Milk className="w-12 h-12 text-blue-600" />
                  </div>
                </div>

                <div className="pt-6 md:pt-8">
                  {/* Farm Landscape */}
                  <div className="h-64 md:h-80 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-blue-200 to-blue-300"></div>
                    <div className="absolute bottom-8 left-8 w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                      <Home className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Sun className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white p-3 md:p-4 rounded-2xl shadow-xl animate-bounce-gentle">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">
                    <AnimatedCounter end={70} suffix="+" />
                  </div>
                  <div className="text-xs md:text-sm">Years</div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-right" data-animate id="about-content">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border border-green-200 animate-bounce-gentle">
                  About Mildar Farm
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Three Generations of
                  <span className="text-green-600 block animate-slide-in-right animation-delay-300">
                    {" "}
                    Dairy Excellence
                  </span>
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed animate-fade-in animation-delay-600">
                  Founded in 1952 by the Miller family, Mildar Farm has been a cornerstone of our community for over
                  seven decades. What started as a small family operation has grown into one of the region's most
                  trusted sources for premium dairy products.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed animate-fade-in animation-delay-900">
                  Our commitment to sustainable farming practices, animal welfare, and producing the highest quality
                  dairy products has never wavered. Every glass of milk tells the story of our dedication to excellence.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Heart, title: "Animal Welfare", desc: "Happy cows produce better milk" },
                  { icon: Leaf, title: "Sustainable", desc: "Eco-friendly farming practices" },
                  { icon: Shield, title: "Quality Assured", desc: "Rigorous testing standards" },
                  { icon: Clock, title: "Fresh Daily", desc: "From farm to table in hours" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in-up hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${1200 + index * 150}ms` }}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-gentle">
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in-up animation-delay-1800">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20 bg-gradient-to-br from-cream-50 to-green-50" data-animate>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up" data-animate id="products-header">
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 mb-4 animate-bounce-gentle">
              Our Products
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Farm Fresh <span className="text-green-600">Dairy Products</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              From our pasture to your table, discover our range of premium dairy products made with love and care by
              our family for yours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                id: "fresh-milk",
                name: "Fresh Whole Milk",
                description: "Rich, creamy milk from our grass-fed cows. Perfect for drinking, cooking, and baking.",
                price: "$4.99",
                unit: "per gallon",
                image: "/milk.png", // Your actual image
                features: ["Grass-fed cows", "No hormones", "Pasteurized", "Glass bottles available"],
                popular: true,
              },
              {
                id: "artisan-butter",
                name: "Artisan Butter",
                description: "Churned fresh daily from the cream of our finest milk. Rich, creamy, and delicious.",
                price: "$6.99",
                unit: "per pound",
                image: "/butter.png", // Your actual image
                features: ["Churned daily", "Salted & unsalted", "Premium cream", "Traditional methods"],
              },
              {
                id: "farmhouse-cheese",
                name: "Farmhouse Cheese",
                description: "Aged to perfection in our cheese caves. From mild cheddar to sharp aged varieties.",
                price: "$12.99",
                unit: "per pound",
                image: "/cheese.png", // Your actual image
                features: ["Cave aged", "Multiple varieties", "Award winning", "Small batch"],
              },
              {
                id: "greek-yogurt",
                name: "Greek Yogurt",
                description: "Thick, creamy yogurt packed with probiotics and made from our fresh milk.",
                price: "$5.99",
                unit: "per container",
                image: "/yogurt.png", // Your actual image
                features: ["Probiotic rich", "Multiple flavors", "Low sugar", "High protein"],
              },
              {
                id: "heavy-cream",
                name: "Heavy Cream",
                description: "Rich, thick cream perfect for cooking, baking, and making your own butter.",
                price: "$3.99",
                unit: "per pint",
                image: "/hc.png", // Your actual image
                features: ["Ultra-rich", "Whips perfectly", "Cooking grade", "Fresh daily"],
              },
              {
                id: "ice-cream",
                name: "Ice Cream",
                description: "Handcrafted ice cream made with our fresh cream and natural ingredients.",
                price: "$8.99",
                unit: "per quart",
                image: "/hc.png", // Your actual image
                features: ["Handcrafted", "Natural ingredients", "Seasonal flavors", "Family recipe"],
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white relative overflow-hidden hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                data-animate
                id={`product-${index}`}
              >
                {product.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-white animate-bounce-gentle">Most Popular</Badge>
                  </div>
                )}

                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">{product.description}</p>

                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-xs md:text-sm text-gray-600 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl md:text-2xl font-bold text-green-600 group-hover:scale-105 transition-transform duration-300">
                          {product.price}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 ml-1">{product.unit}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm md:text-base transition-all duration-300 hover:scale-105 group"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12 animate-fade-in-up animation-delay-900">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 md:px-8 py-3 transition-all duration-300 hover:scale-105 group"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Farm Tours Section */}
      <section id="tours" className="py-12 md:py-20 bg-white" data-animate>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-left" data-animate id="tours-content">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border border-green-200 animate-bounce-gentle">
                  Farm Experience
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Visit Our <span className="text-green-600">Working Farm</span>
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Experience farm life firsthand with our guided tours. Meet our cows, learn about sustainable farming
                  practices, and see how we produce our premium dairy products.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    title: "Guided Farm Tours",
                    description: "90-minute tours led by our experienced farmers",
                    price: "$15 per person",
                    features: ["Meet the cows", "Milking demonstration", "Cheese making process", "Farm history"],
                  },
                  {
                    title: "Family Packages",
                    description: "Special rates for families with children",
                    price: "$40 for family of 4",
                    features: ["Kid-friendly activities", "Animal feeding", "Fresh milk tasting", "Take-home samples"],
                  },
                ].map((tour, index) => (
                  <Card
                    key={index}
                    className="p-4 md:p-6 border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">{tour.title}</h3>
                        <p className="text-gray-600 text-sm md:text-base">{tour.description}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-lg md:text-xl font-bold text-green-600">{tour.price}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tour.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs md:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 transition-all duration-300 hover:scale-105">
                  Book Tour Now
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-6 md:px-8 py-3 transition-all duration-300 hover:scale-105"
                >
                  Group Bookings
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-right animation-delay-300" data-animate id="tours-image">
              {/* Farm Tour Visual */}
              <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-green-300 via-green-400 to-green-500 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                {/* Sky */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-200 to-blue-300"></div>

                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-green-600 via-green-500 to-green-400"></div>

                {/* Farm Elements */}
                <div className="absolute bottom-20 left-12 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-12 right-16 w-10 h-10 bg-brown-600 rounded-full flex items-center justify-center">
                  <Cow className="w-5 h-5 text-white" />
                </div>

                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Tractor className="w-4 h-4 text-white" />
                </div>

                {/* People Icons for Tour */}
                <div className="absolute bottom-8 left-1/3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>

                <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-2xl animate-slide-in-up animation-delay-800 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Next Tour</div>
                    <div className="text-xs md:text-sm text-gray-600">Today at 2:00 PM</div>
                  </div>
                  <div className="flex -space-x-1 md:-space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full border-2 border-white flex items-center justify-center animate-pulse-gentle"
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-cream-50" data-animate>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up" data-animate id="testimonials-header">
            <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 mb-4 animate-bounce-gentle">
              Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-green-600">Customers Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Local Family",
                content:
                  "The quality of Mildar Farm's products is unmatched. Our kids love the fresh milk, and we feel good knowing it comes from happy, healthy cows.",
                rating: 5,
                avatar: "SJ",
                color: "bg-pink-500",
              },
              {
                name: "Chef Michael Chen",
                role: "Restaurant Owner",
                content:
                  "As a chef, I demand the best ingredients. Mildar Farm's dairy products elevate every dish. The butter and cream are absolutely exceptional.",
                rating: 5,
                avatar: "MC",
                color: "bg-blue-500",
              },
              {
                name: "Emma Williams",
                role: "Health Enthusiast",
                content:
                  "I love that Mildar Farm practices sustainable farming. Their organic certification and commitment to animal welfare align with my values.",
                rating: 5,
                avatar: "EW",
                color: "bg-green-500",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-4 md:p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
                data-animate
                id={`testimonial-${index}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current animate-twinkle"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-sm md:text-base">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-3 md:mr-4 hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-12 md:py-20 bg-gradient-to-r from-green-600 via-green-700 to-green-600 relative overflow-hidden"
        data-animate
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-700/90"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up" data-animate id="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold text-white animate-slide-in-up">
              Ready to Experience Fresh Dairy?
            </h2>
            <p className="text-lg md:text-xl text-green-100 animate-fade-in animation-delay-300">
              Join hundreds of satisfied customers who trust us for their daily dairy needs. Contact us today for a
              custom quote or to set up regular delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl group px-6 md:px-8 py-3"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105 hover:shadow-xl px-6 md:px-8 py-3"
              >
                Schedule Delivery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 bg-white" data-animate>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-left" data-animate id="contact-info">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border border-green-200 animate-bounce-gentle">
                  Get in Touch
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Visit <span className="text-green-600">Mildar Farm</span>
                </h2>
                <p className="text-base md:text-lg text-gray-700">
                  Come visit us at the farm, call to place an order, or send us a message. We'd love to hear from you!
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Farm Location",
                    content: "1234 Country Road\nGreen Valley, CA 95945",
                    action: "Get Directions",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "(555) 123-FARM\nMon-Sat: 7AM-6PM",
                    action: "Call Now",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@mildarfarm.com\ninfo@mildarfarm.com",
                    action: "Send Email",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl hover:bg-green-50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center animate-pulse-gentle">
                      <contact.icon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{contact.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line mb-2 text-sm md:text-base">{contact.content}</p>
                      <Button
                        variant="link"
                        className="text-green-600 hover:text-green-700 p-0 h-auto text-sm md:text-base transition-all duration-300 hover:translate-x-1"
                      >
                        {contact.action} →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card
              className="p-6 md:p-8 shadow-xl border-0 animate-fade-in-right animation-delay-300"
              data-animate
              id="contact-form"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 transition-all duration-300 hover:scale-105 group">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Brand */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Milk className="w-5 h-5 md:w-6 md:h-6 text-green-800" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-green-300 transition-colors duration-300">
                    Mildar Farm
                  </h3>
                  <p className="text-green-200 text-xs md:text-sm">Fresh • Natural • Pure</p>
                </div>
              </div>
              <p className="text-green-100 text-sm md:text-base">
                Three generations of dairy excellence, bringing you the freshest, highest quality dairy products from
                our family farm.
              </p>
            </div>

            {/* Quick Links */}
            {[
              { title: "Quick Links", links: ["About Us", "Our Products", "Farm Tours", "Contact", "Careers"] },
              {
                title: "Products",
                links: ["Fresh Milk", "Artisan Butter", "Farmhouse Cheese", "Greek Yogurt", "Ice Cream"],
              },
            ].map((section, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                <h4 className="font-semibold mb-4 text-green-200 text-sm md:text-base">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-green-100 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-sm md:text-base"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info */}
            <div className="animate-fade-in-up animation-delay-800">
              <h4 className="font-semibold mb-4 text-green-200 text-sm md:text-base">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-green-300" />
                  <span className="text-green-100 text-xs md:text-sm">1234 Country Road, Green Valley, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 text-green-300" />
                  <span className="text-green-100 text-xs md:text-sm">(555) 123-FARM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 text-green-300" />
                  <span className="text-green-100 text-xs md:text-sm">hello@mildarfarm.com</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-green-700 mb-6 md:mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-up animation-delay-1000">
            <p className="text-green-200 text-xs md:text-sm text-center md:text-left">
              © 2024 Mildar Farm. All rights reserved. | Family owned since 1952
            </p>
            <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-green-200 hover:text-white text-xs md:text-sm transition-all duration-300 hover:scale-105"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-green-200 hover:text-white text-xs md:text-sm transition-all duration-300 hover:scale-105"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
