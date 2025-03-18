
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }).max(500),
  code: z.string().min(10, { message: 'Prompt must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
});

type FormValues = z.infer<typeof formSchema>;

const Submit = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      code: '',
      category: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Insert the new prompt into Supabase
      const { data: prompt, error } = await supabase
        .from('prompts')
        .insert([
          {
            title: data.title,
            description: data.description,
            code: data.code,
            category: data.category,
            copy_count: 0,
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your prompt has been submitted successfully.",
      });

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to submit your prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 px-6 md:px-10 py-12">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">
            Submit Your <span className="gradient-text">Prompt</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Share your best prompts with the community. Quality prompts will be featured on the front page.
          </p>
          
          <div className="bg-card border border-border/40 rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Ultimate Email Response Writer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly explain what your prompt does and how to use it..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="writing">Writing</SelectItem>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="productivity">Productivity</SelectItem>
                          <SelectItem value="creativity">Creativity</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste your full prompt here..." 
                          className="min-h-[200px] font-mono text-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Prompt
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Submit;
